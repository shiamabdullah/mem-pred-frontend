// @flow strict

import { Button, Divider, TextField } from "@mui/material";
import axios from "axios";
import * as React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import HomeLayout from "../layout/home-layout";

function Profile() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const [userInput, setUserInput] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleUpdateProfile = async () => {
    const payload = {
      name: userInput.name,
      email: userInput.email,
      role: user.role,
      update_as: "User",
    };

    if (!userInput.currentPassword) {
      toast.error("Please enter current password");
      return;
    }

    if (userInput.currentPassword) {
      payload.password = userInput.currentPassword;
    }

    if (userInput.newPassword) {
      if (userInput.newPassword.length < 8) {
        toast.error("New password must be at least 8 characters");
      } else if (userInput.newPassword !== userInput.confirmPassword) {
        toast.error("New password and confirm password do not match");
      } else {
        payload.new_password = userInput.newPassword;
      }
    }

    try {
      const url = `${process.env.REACT_APP_BASE_URL}/api/authentication_for_update_user/`;
      const res = await axios.post(url, payload);
      if (res.data.result === "Success") {
        localStorage.setItem("user", JSON.stringify(res.data.data));
        setUser(res.data.data);
        toast.success("Profile updated successfully");
      } else {
        toast.error(res.data.Message);
      }
    } catch (error) {
      // console.log(error)
      toast.error(error.message);
    }
  };

  return (
    <HomeLayout>
      <div className="px-5 pb-10">
        <div>
          <h1 className="">User Profile</h1>
          <p className="text-lg font-medium">Name: {user.name}</p>
          <p className="text-lg font-medium">Email: {user.email}</p>
          <p className="text-lg font-medium">Role: {user.role}</p>
        </div>
        <Divider />
        <div className="">
          <h2>Update Profile</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <TextField
              className="w-full"
              value={userInput.name}
              onChange={(e) =>
                setUserInput({ ...userInput, name: e.target.value })
              }
              label="Name"
              variant="outlined"
              required
            />
            <TextField
              className="w-full"
              value={userInput.email}
              onChange={(e) =>
                setUserInput({ ...userInput, email: e.target.value })
              }
              label="Email"
              variant="outlined"
              type="email"
              disabled
            />
            <TextField
              className="w-full"
              value={userInput.currentPassword}
              onChange={(e) =>
                setUserInput({ ...userInput, currentPassword: e.target.value })
              }
              label="Current Password"
              variant="outlined"
              type="password"
              required
            />
            <TextField
              className="w-full"
              value={userInput.newPassword}
              onChange={(e) =>
                setUserInput({ ...userInput, newPassword: e.target.value })
              }
              label="New Password"
              variant="outlined"
              type="password"
            />
            <TextField
              className="w-full"
              value={userInput.confirmPassword}
              onChange={(e) =>
                setUserInput({ ...userInput, confirmPassword: e.target.value })
              }
              label="Confirm Password"
              variant="outlined"
              type="password"
            />
            <div className="flex justify-end items-end">
              <Button
                variant="contained"
                onClick={handleUpdateProfile}
                className="w-fit text-center h-fit shadow-sm px-5 py-2 rounded-md bg-[#F67E4C] text-white"
              >
                Update Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default Profile;
