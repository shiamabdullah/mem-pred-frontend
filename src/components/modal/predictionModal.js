// @flow strict

import { Typography } from "@mui/material";
import * as React from "react";
import { CSVLink } from "react-csv";
import generateCompareData from "../../utils/helper/generateCompareData";
import CompareTable from "./compare-table";

function PredictionModal({ selectedData }) {
  const selectedDataKeys = Object.keys(selectedData);

  const csvData = generateCompareData(selectedData);
  console.log({ csvData });
  return (
    <div>
      <Typography sx={{ mb: 3 }} align="center" variant="h5" component="h5">
        {selectedDataKeys.length === 2 ? (
          <>
            <span style={{ color: "#7149C6" }}>{selectedDataKeys[0]}</span>
            {" vs "}
            <span style={{ color: "#FF6D60" }}>{selectedDataKeys[1]}</span>
          </>
        ) : (
          <span>Compare Prediction</span>
        )}
      </Typography>
      <div className="flex justify-end mb-3">
        <CSVLink
          data={csvData}
          filename="compare_data.csv"
          className="py-2 px-4 bg-blue-500 hover:bg-blue-600 rounded-md text-white font-medium transition-all duration-200"
        >
          Download CSV
        </CSVLink>
      </div>
      <CompareTable selectedData={selectedData} />
    </div>
  );
}

export default PredictionModal;
