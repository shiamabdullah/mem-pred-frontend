// @flow strict

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import axios from "axios";
import * as React from "react";
import { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { BsTrash3 } from "react-icons/bs";
import { toast } from "react-toastify";

function SingleUser({ user, setUserList }) {
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [userInput, setUserInput] = useState({
    name: user.name,
    email: user.email,
    change_role: user.role,
  });
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  const handleUpdateUser = async () => {
    const payload = {
      name: userInput.name,
      email: userInput.email,
      change_role: userInput.change_role,
      role: loggedInUser.role,
      update_as: "Admin",
    };

    try {
      const url = `${process.env.REACT_APP_BASE_URL}/api/authentication_for_update_user/`;
      const res = await axios.post(url, payload);
      if (res.data.result === "Success") {
        toast.success("User updated successfully");

        setUserList((prev) => {
          const temp = JSON.parse(JSON.stringify(prev));
          const index = temp.findIndex((u) => u.email === user.email);
          temp[index] = res.data.data;
          return temp;
        });
        setIsOpenUpdate(false);
      } else {
        toast.error(res.data.Message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const url = `${process.env.REACT_APP_BASE_URL}/api/authentication_for_delete_user/`;
      const res = await axios.post(url, {
        email: user.email,
      });

      if (res.data.result === "Success") {
        toast.success("User deleted successfully");

        setUserList((prev) => {
          const temp = JSON.parse(JSON.stringify(prev));
          return temp.filter((u) => u.email !== user.email);
        });
        setIsOpenDelete(false);
      } else {
        toast.error(res.data.Message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <>
      <TableRow
        key={user.id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell>{user.id}</TableCell>
        <TableCell align="left">{user.name}</TableCell>
        <TableCell align="left">{user.email}</TableCell>
        <TableCell align="left">{user?.role}</TableCell>
        <TableCell align="left">
          <div className="flex gap-2 text-left">
            <Button
              onClick={() => setIsOpenUpdate(true)}
              className="min-w-fit rounded py-1 bg-gray-300 text-white"
            >
              <AiFillEdit />
            </Button>
            <Button
              onClick={() => setIsOpenDelete(true)}
              className="min-w-fit rounded-md py-1 bg-orange-500 text-white"
            >
              <BsTrash3 />
            </Button>
          </div>
        </TableCell>
      </TableRow>

      <Dialog
        open={isOpenUpdate}
        onClose={() => setIsOpenUpdate(false)}
        aria-labelledby="update-user"
      >
        <DialogTitle id="update-user">Update User Information</DialogTitle>
        <DialogContent>
          <div>
            <TextField
              sx={{ marginTop: 3, width: 360 }}
              value={userInput.name}
              onChange={(e) =>
                setUserInput({ ...userInput, name: e.target.value })
              }
              label="Name"
              variant="outlined"
              required
            />
          </div>

          <div>
            <FormControl
              sx={{ marginTop: 3, width: 380, padding: "8px 12px" }}
              onChange={(e) =>
                setUserInput({ ...userInput, change_role: e.target.value })
              }
              required
            >
              <FormLabel>User Role</FormLabel>
              <RadioGroup defaultValue={userInput?.change_role} row>
                <FormControlLabel
                  value="Admin"
                  control={<Radio />}
                  label="Admin"
                />
                <FormControlLabel
                  value="User"
                  control={<Radio />}
                  label="User"
                />
              </RadioGroup>
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button color="info" onClick={() => setIsOpenUpdate(false)}>
            Cancel
          </Button>
          <Button color="success" onClick={handleUpdateUser} autoFocus>
            Update
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isOpenDelete}
        onClose={() => setIsOpenDelete(false)}
        aria-labelledby="delete-user"
      >
        <DialogTitle id="delete-user">
          Are you sure you want to delete?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            After deleting the user, you will lost this user data forever.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="info" onClick={() => setIsOpenDelete(false)}>
            Cancel
          </Button>
          <Button color="error" onClick={handleDeleteUser} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default SingleUser;
