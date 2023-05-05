import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { resetLogicInput, selectLogicInput, updateLogicInput, updateLogicOutput } from "../../../redux/reducer/logicSlice";
import LogicPredictionInputs from "./logic-prediction-input";

const LogicPrediction = () => {
  const logicDefaultInput = useSelector(selectLogicInput)
  const [predictions, setPredictions] = useState({});
  const [predictionInput, setPredictionInput] = useState(logicDefaultInput);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()

  const handleOnChange = (e) => {
    setPredictionInput((prev) => {
      const temp = JSON.parse(JSON.stringify(prev));
      temp[e.target.name] = e.target.value;
      return temp;
    });
  };

  const postPrediction = (payload) => {
    setLoading(true);
    const url = `${process.env.REACT_APP_BASE_URL}/api/predict/`;
    axios
      .post(url, payload)
      .then((response) => {
        if (response.data?.result?.length > 0) {
          dispatch(updateLogicOutput(response.data.result[0]))
        };
        setPredictions(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.message)
      }
      );
    // .finally(() => );
  };

  // Define handleReset function
  const handleReset = () => {
    setPredictionInput({});
    setLoading(false);
    dispatch(resetLogicInput)
  };

  const onSubmit = async () => {
    dispatch(updateLogicInput(predictionInput))
    // Filtered Values in a array
    if (
      !predictionInput.frequency ||
      !predictionInput.vnom ||
      !predictionInput.track ||
      !predictionInput.design ||
      !predictionInput.beol ||
      !predictionInput.process ||
      !predictionInput.bias
    ) {
      toast.error(
        `${!predictionInput.frequency ? "Frequency," : ""} ${!predictionInput.vnom ? "Vnom," : ""
        } ${!predictionInput.track ? "Track," : ""} ${!predictionInput.design ? "Design," : ""
        } ${!predictionInput.beol ? "Beol," : ""} 
        ${!predictionInput.process ? "Process," : ""}
        ${!predictionInput.bias ? "BIAS," : ""}
        field are required`
      );
      return;
    }
    const validityArray = Object.values(predictionInput).filter((val) =>
      Boolean(val)
    );

    if (validityArray.length === 0) {
      toast.error("Atleast one field is required");
      return;
    }

    // Call API from here
    const payload = {
      achieved_frequency_ghz: predictionInput.frequency
        ? predictionInput.frequency
        : undefined,
      vnom: predictionInput.vnom ? predictionInput.vnom : undefined,

      track: predictionInput.track
        ? predictionInput.track
        : undefined,
      design: predictionInput.design ? predictionInput.design : undefined,
      beol: predictionInput.beol ? predictionInput.beol : undefined,
      process: predictionInput.process ? predictionInput.process : undefined,
      bias: predictionInput.process ? predictionInput.bias : undefined,
    };

    postPrediction(payload);
  };

  return (
    <>
      <>
        <LogicPredictionInputs
          loading={loading}
          handleOnChange={handleOnChange}
          onSubmit={onSubmit}
          handleReset={handleReset}
          predictionInput={predictionInput}
        />
      </>
    </>
  );
};
export default LogicPrediction;
