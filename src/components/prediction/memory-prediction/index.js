import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { selectLoading, updateLoading } from "../../../redux/reducer/layoutSlice";
import { resetMemoryInput, selectMemoryInput, updateMemoryInput, updateMemoryOutput } from "../../../redux/reducer/memorySlice";
import MemoryPredictionInputs from "./memory-prediction-input";

const MemoryPrediction = () => {
  const memoryInput = useSelector(selectMemoryInput)
  const [predictionInput, setPredictionInput] = useState(memoryInput);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();

  // Define handleOnChange function
  const handleOnChange = (e) => {
    if (e.target.name === "tech") {
      handleReset()
    }
    console.log(e.target.name)
    setPredictionInput((prev) => {
      const temp = JSON.parse(JSON.stringify(prev));
      temp[e.target?.name] = e.target?.value;
      return temp;
    });
  };

  // Define handleChangeAutoComplete function
  const handleChangeAutoComplete = (value, name) => {
    setPredictionInput((prev) => {
      const temp = JSON.parse(JSON.stringify(prev));
      temp[name] = value;
      return temp;
    });
  };

  // Function to send data payload to a server endpoint for prediction
  const postPrediction = (payload, url) => {
    console.log(payload)
    axios
      .post(url, payload)
      .then((response) => {
        if (response.data?.result?.length > 0) {
          dispatch(updateMemoryOutput(response?.data.result[0]))
        };
        dispatch(updateLoading(false));
      })
      .catch((error) => {
        dispatch(updateLoading(false));
        toast.error(error.message);
      });
  };

  // Error for required fields  
  const validatePredictionInput = (predictionInput) => {
    const requiredFields = predictionInput.tech === "12LPP" ?
      ["vendor", "tech", "mem_type", "port", "hd_or_hs", "vt_type", "words", "bits", "mux", "banks"] :
      ["vendor", "tech", "mem_type", "port", "words", "bits"];

    const missingFields = requiredFields.filter((field) => !predictionInput[field]);
    return missingFields.length === 0
      ? null
      : `${missingFields.join(", ")} field${missingFields.length > 1 ? "s" : ""} are required`;
  };

  // Define onSubmit function
  const onSubmit = async () => {

    dispatch(updateMemoryInput(predictionInput))
    const validationError = validatePredictionInput(predictionInput);

    if (validationError) {
      toast.error(validationError);
      return;
    }

    dispatch(updateLoading(true))

    let url;
    predictionInput?.tech === "12LPP"
      ? (url = `${process.env.REACT_APP_BASE_URL}/api/predict-memory-new/`)
      : (url = `${process.env.REACT_APP_BASE_URL}/api/predict-memory/`);


    const payload = predictionInput?.tech === "12LPP" ? {
      vendor: predictionInput?.vendor,
      tech: predictionInput?.tech,
      mem_type: predictionInput?.mem_type,
      port: predictionInput?.port,
      hd_or_hs: predictionInput?.hd_or_hs,
      vt_type: predictionInput?.vt_type,
      words: predictionInput.words,
      bits: predictionInput.bits,
      mux: predictionInput.mux,
      banks: predictionInput.banks,
    } : {
      // ...predictionInput,
      comp: predictionInput.vendor,
      type:
        predictionInput.tech +
        "_" +
        predictionInput.mem_type +
        "_" +
        predictionInput.port,
      words: predictionInput.words,
      bits: predictionInput.bits,
    }

    postPrediction(payload, url);
  };

  // Define handleReset function
  const handleReset = () => {
    setPredictionInput({
      model: 'basic',
      tech: '12LPP',
    });
    dispatch(resetMemoryInput)
    dispatch(updateLoading(false));
  };

  return (
    <>
      <>
        <MemoryPredictionInputs
          loading={loading}
          handleOnChange={handleOnChange}
          onSubmit={onSubmit}
          handleReset={handleReset}
          predictionInput={predictionInput}
          handleChangeAutoComplete={handleChangeAutoComplete}
        />
      </>
    </>
  );
};
export default MemoryPrediction;
