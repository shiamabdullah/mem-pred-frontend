// @flow strict

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import SingleUser from './single-user';

function UsersList() {
  const [userList, setUserList] = useState([]);
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [userInput, setUserInput] = useState({});

  const fetchUsers = async () => {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/get_all_users/`);
    setUserList(res?.data?.data)
  };

  const createNewUser = async () => {
    if (!userInput?.name || !userInput?.email || !userInput?.role || !userInput?.password) {
      toast.error("Please fill all fields");
    }

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/authentication_for_create_user/`,
        userInput
      );

      if (res.data.result === "Success") {
        setUserList(res.data.data);
        toast.success(res.data.Message);
      } else {
        toast.error(res.data.Message);
      };
      setIsOpenCreate(false);
      // console.log(res)
    } catch (error) {
      console.log(error)
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [])

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1>User List</h1>
        <Button
          onClick={() => setIsOpenCreate(true)}
          variant='contained'
          color='secondary'>Create User</Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className='text-left font-semibold text-base'>ID</TableCell>
              <TableCell className='text-left font-semibold text-base'>Name</TableCell>
              <TableCell className='text-left font-semibold text-base'>Email</TableCell>
              <TableCell className='text-left font-semibold text-base'>Role</TableCell>
              <TableCell className='text-left font-semibold text-base'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              userList.map((user, i) => (
                <SingleUser
                  user={user}
                  setUserList={setUserList}
                  key={i}
                />
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={isOpenCreate}
        onClose={() => setIsOpenCreate(false)}
        aria-labelledby="Create-user"
      >
        <DialogTitle id="Create-user">
          Create New User
        </DialogTitle>
        <DialogContent>
          <div>
            <TextField
              sx={{ marginTop: 2, width: 380 }}
              value={userInput?.name}
              onChange={(e) => setUserInput({ ...userInput, name: e.target.value })}
              label="Name"
              variant="outlined"
              required
            />
          </div>
          <div>
            <TextField
              sx={{ marginTop: 3, width: 380 }}
              value={userInput?.email}
              onChange={(e) => setUserInput({ ...userInput, email: e.target.value })}
              label="Email"
              type='email'
              variant="outlined"
              required
            />
          </div>

          <div>
            <FormControl
              sx={{ marginTop: 3, width: 380, padding: '8px 12px' }}
              onChange={(e) => setUserInput({ ...userInput, role: e.target.value })}
              required
            >
              <FormLabel>User Role</FormLabel>
              <RadioGroup defaultValue={userInput?.change_role} row>
                <FormControlLabel value="Admin" control={<Radio />} label="Admin" />
                <FormControlLabel value="User" control={<Radio />} label="User" />
              </RadioGroup>
            </FormControl>
          </div>
          <div>
            <TextField
              sx={{ marginTop: 4, width: 380 }}
              value={userInput?.password}
              onChange={(e) => setUserInput({ ...userInput, password: e.target.value })}
              label="Password"
              type='password'
              variant="outlined"
              required
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button color='info' onClick={() => setIsOpenCreate(false)}>Cancel</Button>
          <Button onClick={createNewUser} color='success' autoFocus>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UsersList;