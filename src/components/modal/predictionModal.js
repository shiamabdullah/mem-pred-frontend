// @flow strict

import { Button, Typography } from "@mui/material";
import * as React from "react";
import { CSVLink } from "react-csv";
import { MdOutlineFileDownload } from "react-icons/md";
import generateCompareData from "../../utils/helper/generateCompareData";
import CompareTable from "./compare-table";

function PredictionModal({ selectedData }) {
  const selectedDataKeys = Object.keys(selectedData);
  const csvData = generateCompareData(selectedData);

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
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          paddingBottom: "1rem",
        }}
      >
        <CSVLink
          data={csvData}
          filename={`compare_data_${new Date()
            .toISOString()
            .replace(/[-T:\.Z]/g, "")}.csv`}
        >
          <Button
            variant="contained"
            style={{
              width: "8rem",
              textAlign: "center",
              boxShadow:
                "0 1px 2px rgba(0,0,0,0.16), 0 1px 2px rgba(0,0,0,0.23)",
              padding: "0.5rem 1rem",
              borderRadius: "0.375rem",
              backgroundColor: "#F67E4C",
              color: "white",
            }}
          >
            Download
          </Button>
        </CSVLink>
      </div>
      <CompareTable selectedData={selectedData} />
    </div>
  );
}

export default PredictionModal;
