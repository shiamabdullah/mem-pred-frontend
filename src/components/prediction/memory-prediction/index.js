import axios from "axios";
import { useEffect, useState } from "react";
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
import {
  findMuxBanks,
  findWordsBits,
  findWordsBitsFor22fdx,
  findMuxBanksFor22fdx,
} from "../../../utils/helper/solution";
import MemoryPredictionInputs from "./memory-prediction-input";

const MemoryPrediction = () => {
  const memoryInput = useSelector(selectMemoryInput);
  const [inputData, setInputData] = useState(memoryInput);
  const [banksRange, setBanksRange] = useState([]);
  const [muxRange, setMuxRange] = useState([]);
  const [optionBits, setoptionBits] = useState([]);
  const [optionWords, setOptionWords] = useState([]);
  const [selectedBanks, setSelectedBanks] = useState([]);
  const [selectedMux, setSelectedMux] = useState([]);
  const [fileName, setFileName] = useState();
  const [selectAllValuesForBanks, setSelectAllValuesForBanks] = useState([]);
  const [selectAllValuesForMux, setSelectAllValuesForMux] = useState([]);
  const [selectModel, setSelectModel] = useState("M1");
  const [optionForSelectModel, setOptionForselectModel] = useState([
    "M1",
    "M1_M2",
  ]);
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

  const handleChangeModel = (e) => {
    setSelectModel(e.target.value);
  };

  // Function to send data payload to a server endpoint for prediction
  const postPrediction = (payload, url) => {
    console.log(payload);
    axios
      .post(url, payload)
      .then((response) => {
        console.log(response.data);
        if (payload.tech === "12LPP") {
          if (response.data?.model_1?.length > 0) {
            if (selectModel === "M1") {
              let temp = { ...response.data.model_1[0] }; // Create a deep copy of model_1[0]
              dispatch(updateMemoryOutput(temp));
              console.log(response.data);
            } else {
              let temp = { ...response.data.model_1[0] }; // Create a deep copy of model_1[0]
              let temp2 = { ...response.data.model_2[0] }; // Create a deep copy of model_2[0]
              temp["Area_umA2"] = temp2["Area_umA2"];
              console.log(response.data);
              dispatch(updateMemoryOutput(temp));
            }
          }
        } else {
          if (response.data?.result.length > 0) {
            dispatch(updateMemoryOutput(response.data?.result[0]));
          }
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
            "banks",
            "mux",
          ]
        : ["vendor", "tech", "mem_type", "port", "words", "bits"];

    // if (inputData.banks.length === 1 && inputData.mux.length === 1) {
    //   requiredFields.push("banks", "mux");
    // } else if (inputData.banks.length === 1 && inputData.mux.length > 1) {
    //   requiredFields.push("banks", "muxMin", "muxMax");
    // } else if (inputData.mux.length === 1 && inputData.banks.length > 1) {
    //   requiredFields.push("banksMin", "banksMax", "mux");
    // } else {
    //   console.log(`"banksMin", "banksMax", "muxMin", "muxMax"`);
    //   requiredFields.push("banksMin", "banksMax", "muxMin", "muxMax");
    // }

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
    let valueAllFlag = false;
    inputData?.banks?.includes("All") ? (valueAllFlag = true) : "";
    inputData?.mux?.includes("All") ? (valueAllFlag = true) : "";

    if (inputData?.banks?.length > 1 && inputData?.mux?.length > 1) {
      if (valueAllFlag === true) {
        for (let i = 0; i < selectAllValuesForBanks.length; i++) {
          for (let j = 0; j < selectAllValuesForMux.length; j++) {
            payload.push({
              vendor: inputData?.vendor,
              tech: inputData?.tech,
              mem_type: inputData?.mem_type,
              port: inputData?.port,
              hd_or_hs: inputData?.hd_or_hs,
              vt_type: inputData?.vt_type,
              words: inputData.words,
              bits: inputData.bits,
              mux: selectAllValuesForMux[j],
              banks: selectAllValuesForBanks[i],
            });
          }
        }
      } else {
        for (let i = 0; i < inputData?.banks.length; i++) {
          for (let j = 0; j < parseInt(inputData?.mux?.length); j++) {
            payload.push({
              vendor: inputData?.vendor,
              tech: inputData?.tech,
              mem_type: inputData?.mem_type,
              port: inputData?.port,
              hd_or_hs: inputData?.hd_or_hs,
              vt_type: inputData?.vt_type,
              words: inputData.words,
              bits: inputData.bits,
              mux: inputData.mux[j],
              banks: inputData.banks[i],
            });
          }
        }
      }
    } else if (inputData?.banks?.length > 1 && inputData?.mux?.length === 1) {
      if (valueAllFlag === true) {
        for (let i = 0; i < selectAllValuesForBanks.length; i++) {
          payload.push({
            vendor: inputData?.vendor,
            tech: inputData?.tech,
            mem_type: inputData?.mem_type,
            port: inputData?.port,
            hd_or_hs: inputData?.hd_or_hs,
            vt_type: inputData?.vt_type,
            words: inputData.words,
            bits: inputData.bits,
            mux: inputData?.mux[0],
            banks: selectAllValuesForBanks[i],
          });
        }
      } else {
        for (let i = 0; i < parseInt(inputData?.banks.length); i++) {
          payload.push({
            vendor: inputData?.vendor,
            tech: inputData?.tech,
            mem_type: inputData?.mem_type,
            port: inputData?.port,
            hd_or_hs: inputData?.hd_or_hs,
            vt_type: inputData?.vt_type,
            words: inputData.words,
            bits: inputData.bits,
            mux: inputData?.mux[0],
            banks: inputData?.banks[i],
          });
        }
      }
    } else {
      if (valueAllFlag === true) {
        for (let i = 0; i < selectAllValuesForMux.length; i++) {
          payload.push({
            vendor: inputData?.vendor,
            tech: inputData?.tech,
            mem_type: inputData?.mem_type,
            port: inputData?.port,
            hd_or_hs: inputData?.hd_or_hs,
            vt_type: inputData?.vt_type,
            words: inputData.words,
            bits: inputData.bits,
            mux: selectAllValuesForMux[i],
            banks: inputData?.banks[0],
          });
        }
      } else {
        for (let i = 0; i < parseInt(inputData?.mux.length); i++) {
          payload.push({
            vendor: inputData?.vendor,
            tech: inputData?.tech,
            mem_type: inputData?.mem_type,
            port: inputData?.port,
            hd_or_hs: inputData?.hd_or_hs,
            vt_type: inputData?.vt_type,
            words: inputData.words,
            bits: inputData.bits,
            mux: inputData?.mux[i],
            banks: inputData?.banks[0],
          });
        }
      }
    }

    console.log(payload, inputData);

    let url;

    inputData?.tech === "22FDX"
      ? (url = `${process.env.REACT_APP_BASE_URL}/api/predict-memory-22fdx-multi/`)
      : (url = `${process.env.REACT_APP_BASE_URL}/api/predict-memory-12lpp-multi/`);
    console.log(payload[0].tech);
    axios
      .post(url, payload)
      .then((response) => {
        if (payload[0].tech === "12LPP") {
          console.log("sgfsd gfsefh");
          if (response.data?.model_1?.length > 0) {
            if (selectModel === "M1") {
              dispatch(updateMultipleOutput(response.data?.model_1));
            } else {
              response.data?.model_1.map(
                (e, i) =>
                  (e["Area_umA2"] = response.data?.model_2[i]["Area_umA2"])
              );
              dispatch(updateMultipleOutput(response.data?.model_1));
            }
          }
        } else {
          if (response.data?.result?.length > 0) {
            dispatch(updateMultipleOutput(response.data.result));
          }
        }
        dispatch(updateLoading(false));
      })
      .catch((error) => {
        dispatch(updateLoading(false));
        toast.error(error.message);
      });

    // dispatch(updateLoading(false));
  };

  // const rangeValidationCheck = (inputData) => {
  //   if (inputData?.banksType === "specific" && parseInt(inputData?.banks) < 1) {
  //     return "Banks must be a positive number";
  //   } else if (
  //     inputData?.banksType === "range" &&
  //     (parseInt(inputData?.banksMax) < parseInt(inputData?.banksMin) ||
  //       parseInt(inputData?.banksMin) < 1)
  //   ) {
  //     return "Banks must be a positive number";
  //   } else if (inputData?.mux === "specific" && parseInt(inputData?.mux) < 1) {
  //     return "Mux must be a positive number";
  //   } else if (
  //     inputData?.mux === "range" &&
  //     (parseInt(inputData?.muxMax) < parseInt(inputData?.muxMin) ||
  //       parseInt(inputData?.muxMin) < 1)
  //   ) {
  //     return "Mux must be a positive number";
  //   } else {
  //     return false;
  //   }
  // };

  // Define onSubmit function
  const onSubmit = async () => {
    dispatch(updateMemoryInput(inputData));
    const validationError = validateRequiredInput(inputData);

    if (validationError) {
      toast.error(validationError);
      return;
    }
    // const rangeError = rangeValidationCheck(inputData);

    // if (rangeError) {
    //   toast.error(rangeError);
    //   return;
    // }
    dispatch(updateLoading(true));

    if (inputData?.banks?.length === 1 && inputData?.mux?.length === 1) {
      let url;
      inputData?.tech === "12LPP"
        ? (url = `${process.env.REACT_APP_BASE_URL}/api/predict-memory-12lpp/`)
        : inputData?.tech === "22FDX"
        ? (url = `${process.env.REACT_APP_BASE_URL}/api/predict-memory-22fdx/`)
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
          : inputData?.tech === "22FDX"
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

  const setBanksAndMuxRanges = () => {
    console.log(inputData);
    if (inputData.tech === "12LPP") {
      if (inputData.words && inputData.bits) {
        const matchedRange =
          fileName &&
          findMuxBanks(
            fileName,
            parseInt(inputData.words),
            parseInt(inputData.bits)
          );

        matchedRange?.matching_banks?.length > 0 &&
          matchedRange?.matching_banks?.push("All");
        matchedRange?.matching_banks?.length > 0 &&
          matchedRange?.matching_mux?.push("All");
        // console.log(matchedRange)
        setBanksRange(
          matchedRange?.matching_banks?.length > 0
            ? matchedRange.matching_banks
            : []
        );
        setMuxRange(
          matchedRange?.matching_mux?.length > 0
            ? matchedRange.matching_mux
            : []
        );
      }
    } else {
      console.log("22fdx");
      console.log(fileName);

      if (inputData.words && inputData.bits) {
        const matchedRange =
          fileName &&
          findMuxBanksFor22fdx(
            fileName,
            parseInt(inputData.words),
            parseInt(inputData.bits)
          );

        matchedRange?.matching_banks?.length > 0 &&
          matchedRange?.matching_banks?.push("All");
        matchedRange?.matching_banks?.length > 0 &&
          matchedRange?.matching_mux?.push("All");
        // console.log(matchedRange)
        setBanksRange(
          matchedRange?.matching_banks?.length > 0
            ? matchedRange.matching_banks
            : []
        );
        setMuxRange(
          matchedRange?.matching_mux?.length > 0
            ? matchedRange.matching_mux
            : []
        );
      }
    }
  };

  const setWordsAndBits = () => {
    if (
      inputData.mem_type &&
      inputData.port &&
      inputData.hd_or_hs &&
      inputData.vt_type
    ) {
      let vtType = inputData.vt_type === "r" ? "rvt" : "lvt";
      if (inputData.tech && inputData.tech === "12LPP") {
        let fileNameTemp = `${inputData.mem_type}_${inputData.port}_${inputData.hd_or_hs}_${vtType}`;
        if (fileName && fileNameTemp !== fileName) {
          // predictionInput?.words
          setInputData((prev) => {
            const temp = JSON.parse(JSON.stringify(prev));
            temp["words"] = [];
            temp["bits"] = [];
            return temp;
          });
        }
        setFileName(fileNameTemp);
        let { matchingWords, matchingBits } = findWordsBits(fileNameTemp);
        console.log({ matchingWords, matchingBits });
        setOptionWords(matchingWords);
        setoptionBits(matchingBits);
      } else {
        let fileNameTemp = `${inputData.mem_type}_${inputData.port}_${inputData.hd_or_hs}`;
        if (fileName && fileNameTemp !== fileName) {
          // predictionInput?.words
          setInputData((prev) => {
            const temp = JSON.parse(JSON.stringify(prev));
            temp["words"] = [];
            temp["bits"] = [];
            return temp;
          });
        }
        setFileName(fileNameTemp);
        let { matchingWords, matchingBits } =
          findWordsBitsFor22fdx(fileNameTemp);
        console.log({ matchingWords, matchingBits });
        setOptionWords(matchingWords);
        setoptionBits(matchingBits);
      }
    }
  };

  useEffect(() => {
    setBanksAndMuxRanges();
  }, [inputData.words, inputData.bits]);

  useEffect(() => {
    setWordsAndBits();
  }, [
    inputData.mem_type,
    inputData.port,
    inputData.hd_or_hs,
    inputData.vt_type,
    inputData.tech,
  ]);

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
        banksRange={banksRange}
        muxRange={muxRange}
        optionForWords={optionWords}
        optionForBits={optionBits}
        selectedBanks={selectedBanks}
        selectedMux={selectedMux}
        setSelectedBanks={setSelectedBanks}
        setSelectedMux={setSelectedMux}
        fileName={fileName}
        setSelectAllValuesForBanks={setSelectAllValuesForBanks}
        setSelectAllValuesForMux={setSelectAllValuesForMux}
        selectModel={selectModel}
        optionForSelectModel={optionForSelectModel}
        handleChangeModel={handleChangeModel}
      />
    </>
  );
};
export default MemoryPrediction;
