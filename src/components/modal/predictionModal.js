// @flow strict

import { Typography } from '@mui/material';
import * as React from 'react';
import CompareTable from './compare-table';

function PredictionModal({ selectedData }) {
  const selectedDataKeys = Object.keys(selectedData);

  return (
    <div>
      <Typography sx={{mb: 3}} align='center' variant="h5" component="h5">
        {selectedDataKeys.length === 2 ?
         selectedDataKeys[0] + ' vs ' + selectedDataKeys[1]
          : "Compare Prediction"}
      </Typography>
      <CompareTable selectedData={selectedData} />
    </div>
  );
};

export default PredictionModal;








