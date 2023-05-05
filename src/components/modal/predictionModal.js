// @flow strict

import { Typography } from "@mui/material";
import * as React from "react";
import CompareTable from "./compare-table";

function PredictionModal({ selectedData }) {
  const selectedDataKeys = Object.keys(selectedData);

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
      <CompareTable selectedData={selectedData} />
    </div>
  );
}

export default PredictionModal;
