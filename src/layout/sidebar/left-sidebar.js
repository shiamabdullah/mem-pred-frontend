// @flow strict
import { Button } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentState, updateCurrentState } from '../../redux/reducer/layoutSlice';

function LeftSidebar() {
  const currentInput = useSelector(selectCurrentState);
  const dispatch = useDispatch()

  return (
    <div className="outline-1 bg-white h-full rounded-lg 
    shadow-lg 2xl:p-5 p-2 pt-4 2xl:pt-8 flex flex-col items-start gap-4">
      <Button
        className={cn('text-[#84828A] text-left w-full font-medium py-2 rounded-lg px-6', currentInput === 'memory' ? "bg-violet-100 text-violet-600" : "")}
        onClick={() => dispatch(updateCurrentState('memory'))}
      >
        Memory Prediction
      </Button>
      <Button
        className={cn(`text-[#84828A] text-left w-full font-medium py-2 rounded-lg px-6 ${currentInput === 'logic' && "bg-violet-100 text-violet-600"}`)}
        onClick={() => dispatch(updateCurrentState('logic'))}
      >
        Logic Prediction
      </Button>
    </div >
  );
};

export default LeftSidebar;