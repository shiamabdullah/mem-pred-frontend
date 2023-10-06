import { Button, Container, Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { authUsers } from "../utils/data/users";

const Login = () => {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!userInput.email || !userInput.password) {
      toast.warning("Please fill all the fields");
      return;
    }

    const findUser = authUsers.find(user => user.email === userInput.email && user.password === userInput.password);

    if (findUser) {
      localStorage.setItem("user", JSON.stringify(findUser));
      toast.success("Login successful");
      navigate('/ez-gf-internal/jigyasa');
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <Container className="min-h-screen flex items-center justify-center">
      <Paper className="p-8 w-full m-5 lg:w-[480px]">
        <p className="text-left text-2xl capitalize font-semibold text-[#6A5ACD] mb-5">
          Login account
        </p>
        <div className=" flex flex-col gap-4">
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            type="email"
            defaultValue={userInput.email}
            onChange={(e) => setUserInput({ ...userInput, email: e.target.value })}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            defaultValue={userInput.password}
            onChange={(e) => setUserInput({ ...userInput, password: e.target.value })}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="w-32 mt-5 mx-auto text-center shadow-sm py-2 rounded-md bg-[#F67E4C] text-white"
            onClick={handleLogin}
          >
            Login
          </Button>
        </div>
      </Paper>
    </Container>
  );
};

export default Login;
