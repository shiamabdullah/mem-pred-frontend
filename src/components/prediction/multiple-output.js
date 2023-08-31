// @flow strict
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { CSVLink } from "react-csv";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdOutlineFileDownload, MdSave } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { selectLoading } from "../../redux/reducer/layoutSlice";
import {
  selectMemoryInput,
  selectMultipleOutput,
} from "../../redux/reducer/memorySlice";
import { updateSaveMultipleResults } from "../../redux/reducer/resultSlice";
import getCsvHeadersMultipleData from "../../utils/helper/getCsvHeaders";
import SingleChart from "../charts/single-chart";
import BuildOutputResult from "./output-result";

function MultipleOutput() {
  const [isExpanded, setExpanded] = useState(true);
  const [isExpandedChart, setExpandedChart] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const multipleOutput = useSelector(selectMultipleOutput);
  const generatedData = generateCSVData(multipleOutput);
  console.log(multipleOutput);
  const memoryInput = useSelector(selectMemoryInput);

  const csvHeaders = getCsvHeadersMultipleData(multipleOutput);

  function generateCSVData(dataArray) {
    let generatedData = [...dataArray];
    const { minValues, maxValues } = findMinMax(dataArray);
    let mean = findMean(dataArray);
    // let mode = findMode(dataArray);
    let standardDeviation = findStandardDeviation(dataArray);
    let median = findMedian(dataArray);
    let percentageDiffOfStdDevMean = percentageDiffSTDDEVMEAN(
      standardDeviation,
      mean
    );

    generatedData.push(minValues);
    generatedData.push(maxValues);
    generatedData.push(mean);
    generatedData.push(median);
    generatedData.push(standardDeviation);
    generatedData.push(percentageDiffOfStdDevMean);

    console.log({
      minValues,
      maxValues,
      mean,
      median,
      standardDeviation,
      percentageDiffOfStdDevMean,
    });
    console.log(generatedData);
    return generatedData;
  }

  function findMinMax(dataArray) {
    let minValues = { ...dataArray[0] };
    let maxValues = { ...dataArray[0] };

    for (let i = 1; i < dataArray.length; i++) {
      const data = dataArray[i];

      // Compare each property with current minimum and maximum values
      for (const prop in data) {
        if (data[prop] < minValues[prop]) {
          minValues[prop] = data[prop];
        }

        if (data[prop] > maxValues[prop]) {
          maxValues[prop] = data[prop];
        }
      }
    }

    minValues["Vendor"] = "MIN";
    minValues["Tech"] = "";
    minValues["Mem_Type"] = "";
    minValues["Vt_Type"] = "";
    minValues["Port"] = "";
    minValues["HD_or_HS"] = "";
    minValues["Words"] = "";
    minValues["Bits"] = "";
    minValues["Mux"] = "";
    minValues["Banks"] = "";

    maxValues["Vendor"] = "MAX";
    maxValues["Tech"] = "";
    maxValues["Mem_Type"] = "";
    maxValues["Vt_Type"] = "";
    maxValues["Port"] = "";
    maxValues["HD_or_HS"] = "";
    maxValues["Words"] = "";
    maxValues["Bits"] = "";
    maxValues["Mux"] = "";
    maxValues["Banks"] = "";

    return { minValues, maxValues };
  }

  function findStandardDeviation(dataArray) {
    const meanValues = {};
    for (const data of dataArray) {
      for (const prop in data) {
        if (typeof meanValues[prop] === "undefined") {
          meanValues[prop] = 0;
        }
        meanValues[prop] += data[prop];
      }
    }

    for (const prop in meanValues) {
      meanValues[prop] /= dataArray.length;
    }

    // Calculate the sum of squared differences for each property
    const sumSquaredDiffs = {};
    for (const data of dataArray) {
      for (const prop in data) {
        if (typeof sumSquaredDiffs[prop] === "undefined") {
          sumSquaredDiffs[prop] = 0;
        }
        const diff = data[prop] - meanValues[prop];
        sumSquaredDiffs[prop] += diff * diff;
      }
    }

    // Calculate the standard deviation for each property
    const standardDeviations = {};
    for (const prop in sumSquaredDiffs) {
      const variance = sumSquaredDiffs[prop] / dataArray.length;
      const standardDeviation = Math.sqrt(variance);
      standardDeviations[prop] = standardDeviation;
    }
    standardDeviations["Vendor"] = "STDDEV";
    standardDeviations["Tech"] = "";
    standardDeviations["Mem_Type"] = "";
    standardDeviations["Vt_Type"] = "";
    standardDeviations["Port"] = "";
    standardDeviations["HD_or_HS"] = "";
    standardDeviations["Words"] = "";
    standardDeviations["Bits"] = "";
    standardDeviations["Mux"] = "";
    standardDeviations["Banks"] = "";

    console.log("Standard deviations:", standardDeviations);
    return standardDeviations;
  }

  function findMode(dataArray) {
    const modeValues = {}; // Object to store mode values

    // Count occurrences of each property value
    for (let i = 0; i < dataArray.length; i++) {
      const data = dataArray[i];

      for (const prop in data) {
        const value = data[prop];

        if (modeValues[prop]) {
          if (modeValues[prop][value]) {
            modeValues[prop][value] += 1;
          } else {
            modeValues[prop][value] = 1;
          }
        } else {
          modeValues[prop] = {
            [value]: 1,
          };
        }
      }
    }

    // Find the mode value for each property
    for (const prop in modeValues) {
      const values = modeValues[prop];
      let maxCount = 0;
      let modeValue = null;

      for (const value in values) {
        if (values[value] > maxCount) {
          maxCount = values[value];
          modeValue = value;
        }
      }

      modeValues[prop] = modeValue;
    }
    modeValues["Vendor"] = "MODE";
    modeValues["Tech"] = "";
    modeValues["Mem_Type"] = "";
    modeValues["Vt_Type"] = "";
    modeValues["Port"] = "";
    modeValues["HD_or_HS"] = "";
    modeValues["Words"] = "";
    modeValues["Bits"] = "";
    modeValues["Mux"] = "";
    modeValues["Banks"] = "";

    console.log("Mode values:", modeValues);

    return modeValues;
  }

  function percentageDiffSTDDEVMEAN(STDDEV, MEAN) {
    const percentageValues = {};
    for (const prop in MEAN) {
      if (typeof MEAN[prop] === "number" && typeof STDDEV[prop] === "number") {
        const percentage = (STDDEV[prop] / MEAN[prop]) * 100;
        percentageValues[prop] = Number(percentage.toFixed(2));
      }
    }

    percentageValues["Vendor"] = "StdDev/Mean %";
    percentageValues["Tech"] = "";
    percentageValues["Mem_Type"] = "";
    percentageValues["Vt_Type"] = "";
    percentageValues["Port"] = "";
    percentageValues["HD_or_HS"] = "";
    percentageValues["Words"] = "";
    percentageValues["Bits"] = "";
    percentageValues["Mux"] = "";
    percentageValues["Banks"] = "";

    return percentageValues;
  }

  function findMedian(dataArray) {
    const medianValues = {};
    for (const data of dataArray) {
      for (const prop in data) {
        if (!isNaN(data[prop])) {
          if (typeof medianValues[prop] === "undefined") {
            medianValues[prop] = [];
          }
          medianValues[prop].push(data[prop]);
        }
      }
    }

    for (const prop in medianValues) {
      medianValues[prop].sort((a, b) => a - b); // Sort the values in ascending order
      const midIndex = Math.floor(medianValues[prop].length / 2);
      if (medianValues[prop].length % 2 === 0) {
        // If the number of values is even, average the two middle values
        medianValues[prop] =
          (medianValues[prop][midIndex - 1] + medianValues[prop][midIndex]) / 2;
      } else {
        // If the number of values is odd, take the middle value
        medianValues[prop] = medianValues[prop][midIndex];
      }
    }

    medianValues["Vendor"] = "MEDIAN";
    medianValues["Tech"] = "";
    medianValues["Mem_Type"] = "";
    medianValues["Vt_Type"] = "";
    medianValues["Port"] = "";
    medianValues["HD_or_HS"] = "";
    medianValues["Words"] = "";
    medianValues["Bits"] = "";
    medianValues["Mux"] = "";
    medianValues["Banks"] = "";

    console.log("Median values:", medianValues);

    return medianValues;
  }

  function findMean(dataArray) {
    const meanValues = {}; // Object to store mean values

    // Initialize sum values with zero
    const sumValues = {
      Words: 0,
      Bits: 0,
      Mux: 0,
      Banks: 0,
      Area_umA2: 0,
      read_power_pj_ffg: 0,
      read_power_pj_ssg: 0,
      read_power_pj_tt: 0,
      tacc_ns_ffg: 0,
      tacc_ns_ssg: 0,
      tacc_ns_tt: 0,
      tcycle_ns_ffg: 0,
      tcycle_ns_ssg: 0,
      tcycle_ns_tt: 0,
      thold_ns_ffg: 0,
      thold_ns_ssg: 0,
      thold_ns_tt: 0,
      tsetup_ns_ffg: 0,
      tsetup_ns_ssg: 0,
      tsetup_ns_tt: 0,
      write_power_pj_ffg: 0,
      write_power_pj_ssg: 0,
      write_power_pj_tt: 0,
      leakage_power_mw_ffg: 0,
      leakage_power_mw_ssg: 0,
      leakage_power_mw_tt: 0,
    };

    // Calculate sum of property values
    for (let i = 0; i < dataArray.length; i++) {
      const data = dataArray[i];

      for (const prop in data) {
        sumValues[prop] += data[prop];
      }
    }

    const totalObjects = dataArray.length;

    // Calculate mean values
    for (const prop in sumValues) {
      meanValues[prop] = sumValues[prop] / totalObjects;
    }
    meanValues["Vendor"] = "MEAN";
    meanValues["Tech"] = "";
    meanValues["Mem_Type"] = "";
    meanValues["Vt_Type"] = "";
    meanValues["Port"] = "";
    meanValues["HD_or_HS"] = "";
    meanValues["Words"] = "";
    meanValues["Bits"] = "";
    meanValues["Mux"] = "";
    meanValues["Banks"] = "";

    console.log("Mean values:", meanValues);
    return meanValues;
  }

  function generateFileName(result) {
    const { words, bits, mem_type, vendor, mux, banks, vt_type, hd_or_hs } =
      result;
    const muxRange =
      result.muxMin !== undefined && result.muxMax !== undefined
        ? `${result.muxMin}-${result.muxMax}`
        : result.mux;
    const banksRange =
      result.banksMin !== undefined && result.banksMax !== undefined
        ? `${result.banksMin}-${result.banksMax}`
        : result.banks;
    const sizeInKb = (((words ?? 0) * (bits ?? 0)) / 1024).toFixed();
    const fileName = `${sizeInKb}kb_${mem_type}_${vendor}_words-${words}_bits-${bits}_mux-${muxRange}_banks-${banksRange}_vt-${vt_type}_${hd_or_hs}`;
    return fileName;
  }

  function generateFileNameForChartName(result) {
    const {
      words,
      bits,
      mem_type,
      vendor,
      mux,
      banks,
      vt_type,
      hd_or_hs,
      port,
      tech,
    } = result;
    const muxRange =
      result.muxMin !== undefined && result.muxMax !== undefined
        ? `${result.muxMin}-${result.muxMax}`
        : result.mux;
    const banksRange =
      result.banksMin !== undefined && result.banksMax !== undefined
        ? `${result.banksMin}-${result.banksMax}`
        : result.banks;
    const sizeInKb = (((words ?? 0) * (bits ?? 0)) / 1024).toFixed();
    const fileName = `${tech.toLowerCase()}_${vendor.toLowerCase()}_${mem_type}_${port}_${vt_type.toLowerCase()}_${hd_or_hs}`;
    return fileName;
  }

  const handleSaveResult = () => {
    const newResult = {
      name: generateFileName(memoryInput),
      data: multipleOutput,
    };
    dispatch(updateSaveMultipleResults(newResult));
  };

  const keywords = [
    "Area_umA2",
    "leakage_power_mw_ffg",
    "leakage_power_mw_ssg",
    "leakage_power_mw_tt",
    "leakage_power_mw_ffg_log10",
    "leakage_power_mw_ssg_log10",
    "leakage_power_mw_tt_log10",
    "read_power_pj_ffg",
    "read_power_pj_ssg",
    "read_power_pj_tt",
    "tacc_ns_ffg",
    "tacc_ns_ssg",
    "tacc_ns_tt",
    "tcycle_ns_ffg",
    "tcycle_ns_ssg",
    "tcycle_ns_tt",
    "thold_ns_ffg",
    "thold_ns_ssg",
    "thold_ns_tt",
    "tsetup_ns_ffg",
    "tsetup_ns_ssg",
    "tsetup_ns_tt",
    "write_power_pj_ffg",
    "write_power_pj_ssg",
    "write_power_pj_tt",
  ];

  return (
    <div className="">
      <Accordion
        className="rounded-lg mt-5 border-none"
        expanded={isExpanded}
        onChange={(e, f) => setExpanded(f)}
      >
        <AccordionSummary
          expandIcon={<IoMdArrowDropdown className="text-2xl text-[#F24E1E]" />}
        >
          <h3 className="text-left font-medium my-0 py-0 text-[#84828A] text-xl">
            Outputs
          </h3>
        </AccordionSummary>
        <AccordionDetails>
          <div className="relative">
            <div className="flex justify-end items-center mb-2">
              <div className="flex gap-2">
                <Tooltip title="Save Result" placement="top">
                  <Button onClick={handleSaveResult} className="p-1 min-w-fit">
                    <MdSave className="text-xl text-[#F24E1E]" />
                  </Button>
                </Tooltip>

                <Tooltip title="Download CSV" placement="top">
                  <Button className="p-0 min-w-fit">
                    <CSVLink
                      data={generatedData}
                      headers={csvHeaders}
                      filename={generateFileName(memoryInput) + ".csv"}
                      className={`inline-flex items-center`}
                    >
                      <MdOutlineFileDownload className="text-2xl text-[#F24E1E]" />
                    </CSVLink>
                  </Button>
                </Tooltip>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 gap-y-4 mt-3">
              {loading ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 5,
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                multipleOutput.map((item, index) => (
                  <div
                    key={index}
                    className="shadow-[0_5px_20px_rgba(0,0,0,0.05)]  rounded-lg"
                  >
                    <BuildOutputResult data={item} />
                  </div>
                ))
              )}
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion
        className="rounded-lg mt-5 border-none"
        expanded={isExpandedChart}
        onChange={(e, f) => setExpandedChart(f)}
      >
        <AccordionSummary
          expandIcon={<IoMdArrowDropdown className="text-2xl text-[#F24E1E]" />}
        >
          <h3 className="text-left font-medium my-0 py-0 text-[#84828A] text-xl">
            Charts
          </h3>
        </AccordionSummary>
        <AccordionDetails>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
            {keywords.map((keyword, index) => (
              <SingleChart
                key={index}
                multipleOutput={multipleOutput}
                keyword={keyword}
                chartName={generateFileNameForChartName(memoryInput)}
              />
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default MultipleOutput;
