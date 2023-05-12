import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  selectLoading,
  updateLoading,
} from "../../../redux/reducer/layoutSlice";
import {
  resetMemoryInput,
  selectMemoryInput,
  updateMemoryInput,
  updateMemoryOutput,
  updateMultipleOutput,
} from "../../../redux/reducer/memorySlice";
import MemoryPredictionInputs from "./memory-prediction-input";

const MemoryPrediction = () => {
  const memoryInput = useSelector(selectMemoryInput);
  const [inputData, setInputData] = useState(memoryInput);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();

  // Define handleOnChange function
  const handleOnChange = (e) => {
    if (e.target.name === "tech") {
      handleReset();
    }
    // console.log(e.target.name)
    setInputData((prev) => {
      const temp = JSON.parse(JSON.stringify(prev));
      temp[e.target?.name] = e.target?.value;
      return temp;
    });
  };

  // Define handleChangeAutoComplete function
  const handleChangeAutoComplete = (value, name) => {
    setInputData((prev) => {
      const temp = JSON.parse(JSON.stringify(prev));
      temp[name] = value;
      return temp;
    });
  };

  // Function to send data payload to a server endpoint for prediction
  const postPrediction = (payload, url) => {
    // console.log(payload)
    axios
      .post(url, payload)
      .then((response) => {
        if (response.data?.result?.length > 0) {
          dispatch(updateMemoryOutput(response?.data.result[0]));
        }
        dispatch(updateLoading(false));
      })
      .catch((error) => {
        dispatch(updateLoading(false));
        toast.error(error.message);
      });
  };

  // Error for required fields
  const validateRequiredInput = (inputData) => {
    let requiredFields =
      inputData.tech === "12LPP"
        ? [
            "vendor",
            "tech",
            "mem_type",
            "port",
            "hd_or_hs",
            "vt_type",
            "words",
            "bits",
          ]
        : ["vendor", "tech", "mem_type", "port", "words", "bits"];

    if (
      inputData.banksType === "specific" &&
      inputData.muxType === "specific"
    ) {
      requiredFields.push("banks", "mux");
    } else if (
      inputData.banksType === "specific" &&
      inputData.muxType === "range"
    ) {
      requiredFields.push("banks", "muxMin", "muxMax");
    } else if (
      inputData.muxType === "specific" &&
      inputData.banksType === "range"
    ) {
      requiredFields.push("banksMin", "banksMax", "mux");
    } else {
      requiredFields.push("banksMin", "banksMax", "muxMin", "muxMax");
    }

    const missingFields = requiredFields.filter((field) => !inputData[field]);
    return missingFields.length === 0
      ? null
      : `${missingFields.join(", ")} field${
          missingFields.length > 1 ? "s" : ""
        } are required`;
  };

  // Send request with multiple input
  const sendMultipleRequest = () => {
    const payload = [];

    if (inputData?.banksType === "range" && inputData?.muxType === "range") {
      for (
        let i = parseInt(inputData?.banksMin);
        i <= inputData?.banksMax;
        i++
      ) {
        for (
          let j = parseInt(inputData?.muxMin);
          j <= parseInt(inputData?.muxMax);
          j++
        ) {
          payload.push({
            vendor: inputData?.vendor,
            tech: inputData?.tech,
            mem_type: inputData?.mem_type,
            port: inputData?.port,
            hd_or_hs: inputData?.hd_or_hs,
            vt_type: inputData?.vt_type,
            words: inputData.words,
            bits: inputData.bits,
            mux: j,
            banks: i,
          });
        }
      }
    } else if (
      inputData?.banksType === "range" &&
      inputData?.muxType === "specific"
    ) {
      for (
        let i = parseInt(inputData?.banksMin);
        i <= parseInt(inputData?.banksMax);
        i++
      ) {
        payload.push({
          vendor: inputData?.vendor,
          tech: inputData?.tech,
          mem_type: inputData?.mem_type,
          port: inputData?.port,
          hd_or_hs: inputData?.hd_or_hs,
          vt_type: inputData?.vt_type,
          words: inputData.words,
          bits: inputData.bits,
          mux: inputData?.mux,
          banks: i,
        });
      }
    } else {
      for (
        let i = parseInt(inputData?.muxMin);
        i <= parseInt(inputData?.muxMax);
        i++
      ) {
        payload.push({
          vendor: inputData?.vendor,
          tech: inputData?.tech,
          mem_type: inputData?.mem_type,
          port: inputData?.port,
          hd_or_hs: inputData?.hd_or_hs,
          vt_type: inputData?.vt_type,
          words: inputData.words,
          bits: inputData.bits,
          mux: i,
          banks: inputData?.banks,
        });
      }
    }

    console.log(payload, inputData);

    const url = `${process.env.REACT_APP_BASE_URL}/api/predict-memory-new-multi/`;
    axios
      .post(url, payload)
      .then((response) => {
        if (response.data?.result?.length > 0) {
          // console.log(response?.data?.result)
          dispatch(updateMultipleOutput(response?.data.result));
        }
        dispatch(updateLoading(false));
      })
      .catch((error) => {
        dispatch(updateLoading(false));
        toast.error(error.message);
      });

    // dispatch(updateLoading(false));
  };

  const rangeValidationCheck = (inputData) => {
    if (inputData?.banksType === "specific" && parseInt(inputData?.banks) < 1) {
      return "Banks must be a positive number";
    } else if (
      inputData?.banksType === "range" &&
      (parseInt(inputData?.banksMax) < parseInt(inputData?.banksMin) ||
        parseInt(inputData?.banksMin) < 1)
    ) {
      return "Banks must be a positive number";
    } else if (
      inputData?.muxType === "specific" &&
      parseInt(inputData?.mux) < 1
    ) {
      return "Mux must be a positive number";
    } else if (
      inputData?.muxType === "range" &&
      (parseInt(inputData?.muxMax) < parseInt(inputData?.muxMin) ||
        parseInt(inputData?.muxMin) < 1)
    ) {
      return "Mux must be a positive number";
    } else {
      return false;
    }
  };

  // Define onSubmit function
  const onSubmit = async () => {
    dispatch(updateMemoryInput(inputData));
    const validationError = validateRequiredInput(inputData);

    if (validationError) {
      toast.error(validationError);
      return;
    }
    const rangeError = rangeValidationCheck(inputData);

    if (rangeError) {
      toast.error(rangeError);
      return;
    }
    dispatch(updateLoading(true));

    if (
      inputData?.banksType === "specific" &&
      inputData?.muxType === "specific"
    ) {
      let url;
      inputData?.tech === "12LPP"
        ? (url = `${process.env.REACT_APP_BASE_URL}/api/predict-memory-new/`)
        : (url = `${process.env.REACT_APP_BASE_URL}/api/predict-memory/`);

      const payload =
        inputData?.tech === "12LPP"
          ? {
              vendor: inputData?.vendor,
              tech: inputData?.tech,
              mem_type: inputData?.mem_type,
              port: inputData?.port,
              hd_or_hs: inputData?.hd_or_hs,
              vt_type: inputData?.vt_type,
              words: inputData.words,
              bits: inputData.bits,
              mux: inputData.mux,
              banks: inputData.banks,
            }
          : {
              // ...predictionInput,
              comp: inputData.vendor,
              type:
                inputData.tech +
                "_" +
                inputData.mem_type +
                "_" +
                inputData.port,
              words: inputData.words,
              bits: inputData.bits,
            };

      postPrediction(payload, url);
    } else {
      sendMultipleRequest();
    }
  };

  // Define handleReset function
  const handleReset = () => {
    setInputData({
      model: "basic",
      tech: "12LPP",
      banksType: "specific",
      muxType: "specific",
    });
    dispatch(resetMemoryInput);
    dispatch(updateLoading(false));
  };

  return (
    <>
      <MemoryPredictionInputs
        loading={loading}
        handleOnChange={handleOnChange}
        onSubmit={onSubmit}
        handleReset={handleReset}
        predictionInput={inputData}
        handleChangeAutoComplete={handleChangeAutoComplete}
        setPredictionInput={setInputData}
      />
    </>
  );
};
export default MemoryPrediction;
