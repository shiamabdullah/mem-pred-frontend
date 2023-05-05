// @flow strict

import * as React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentState } from '../../redux/reducer/layoutSlice';
import LogicPrediction from './logic-prediction';
import MemoryPrediction from './memory-prediction';


function PredictionInput() {
  const currentInput = useSelector(selectCurrentState);

  return (
    <div className="p-3">
      {
        currentInput === 'logic' ?
          <LogicPrediction />
          :
          <MemoryPrediction />
      }
    </div>
  );
};

export default PredictionInput;