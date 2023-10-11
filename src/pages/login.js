import { Button, Container, Paper, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const Login = () => {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!userInput.email || !userInput.password) {
      toast.warning("Please fill all the fields");
      return;
    }

    try {
      const url = `${process.env.REACT_APP_BASE_URL}/api/authentication_for_login_user/`;
      const res = await axios.post(url, userInput);

      if (res.data.result === false) {
        toast.error("Invalid email or password");
      } else {
        localStorage.setItem("user", JSON.stringify(res.data.data));
        toast.success("Login successful");
        navigate("/ez-gf-internal/jigyasa/");
      };
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Container className="min-h-screen flex items-center justify-center">
      <Paper className="p-8 w-full m-5 lg:w-[480px]">
        <p className="text-left text-2xl capitalize font-semibold text-[#6A5ACD] mb-5">
          Login to Jigyasa
        </p>
        <div className=" flex flex-col gap-4">
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            type="email"
            defaultValue={userInput.email}
            onChange={(e) =>
              setUserInput({ ...userInput, email: e.target.value })
            }
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            defaultValue={userInput.password}
            onChange={(e) =>
              setUserInput({ ...userInput, password: e.target.value })
            }
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
