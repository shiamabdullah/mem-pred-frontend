import * as React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Prediction from "./components/prediction";
import { useSelector } from "react-redux";
import { selectCurrentState } from "./redux/reducer/layoutSlice";

export default function App() {
  const currentState = useSelector(selectCurrentState);


  React.useEffect(()=>{
    if(currentState === "memory"){
      document.title = "Memory Prediction"
    }else{
      document.title = "Logic Prediction"
    }
  },[currentState])

  return (
    <>
      <Prediction />
      <ToastContainer autoClose={2000} theme='colored' />
    </>
  );
}
