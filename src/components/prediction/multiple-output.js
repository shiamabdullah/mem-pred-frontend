// @flow strict
import { Box, Button, CircularProgress, Tooltip } from '@mui/material';
import * as React from 'react';
import { MdSave } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoading } from '../../redux/reducer/layoutSlice';
import { selectMemoryInput, selectMultipleOutput } from '../../redux/reducer/memorySlice';
import { updateSaveMultipleResults } from '../../redux/reducer/resultSlice';
import BuildOutputResult from './output-result';

function MultipleOutput() {
  const dispatch = useDispatch()
  const loading = useSelector(selectLoading);
  const multipleOutput = useSelector(selectMultipleOutput);
  const memoryInput = useSelector(selectMemoryInput);


  console.log(memoryInput)

  // const properties = Object.entries(output);

  // const getHeader = (data) => {
  //   const temp = []
  //   Object.keys(data).map(item => temp.push({ label: item, key: item }))
  //   return temp
  // }


  function generateFileName(result) {
    // console.log(result)
    const fileName = ((result?.words * result?.bits) / 1024).toFixed(3) + "kb" + "_" + result?.mem_type + "_" + result?.vendor + "_words-" + result?.words + "_bits-" + result?.bits + "_mux-" + result?.muxMin || result?.mux + "-" + result?.banksMax || result?.mux + "_banks-" + result?.banksMin || result?.banks + "-" + result?.banksMax || result?.banks + "_vt-" + result?.vt_type + "_" + result?.hd_or_hs
    return fileName
  }

  // const newData = Object.fromEntries(
  //   Object.entries(output).map(([key, value]) => {
  //     return [
  //       key,
  //       value,
  //     ];
  //   })
  // );


  const handleSaveResult = () => {
    const newResult = { name: generateFileName(memoryInput), data: multipleOutput }
    dispatch(updateSaveMultipleResults(newResult))
  }

  return (
    <div className="relative">
      <h3 className="text-left font-medium p-2 text-[#84828A] text-xl" >Output</h3>
      <div className="flex justify-end items-center mb-2">
        <div className="flex gap-2">

          <Tooltip title="Save Result" placement='top'>
            <Button onClick={handleSaveResult} className="p-1 min-w-fit">
              <MdSave className="text-xl text-[#F24E1E]" />
            </Button>
          </Tooltip>

          <Tooltip title="Download CSV" placement='top'>
            <Button className='p-0 min-w-fit'>
              {/* <CSVLink
                data={[{ ...newData }]}
                headers={getHeader(output)}
                filename={generateFileName(output) + ".csv"}
                className={`inline-flex items-center`}
              >
                <MdOutlineFileDownload className="text-2xl text-[#F24E1E]" />
              </CSVLink> */}
              CSV
            </Button>
          </Tooltip>
        </div>

      </div>
      <div className="grid grid-cols-2 gap-2 gap-y-4 mt-3">
        {
          loading ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
            <CircularProgress />
          </Box> :
            multipleOutput.map((item, index) => (
              <div key={index} className="shadow-[0_5px_20px_rgba(0,0,0,0.05)]  rounded-lg">

                <BuildOutputResult data={item} />

              </div>
            ))
        }

      </div>
    </div>
  );
};

export default MultipleOutput;