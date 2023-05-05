import { Tooltip } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';

const rows = ['Comp', 'Type', 'Words', 'Bits', 'Area_umA2', 'tacc_ns_ffg', 'tcycle_ns_ffg', 'tsetup_ns_ffg', 'thold_ns_ffg', 'read_power_pj_ffg', 'write_power_pj_ffg', 'tacc_ns_ssg', 'tcycle_ns_ssg', 'tsetup_ns_ssg', 'thold_ns_ssg', 'read_power_pj_ssg', 'write_power_pj_ssg', 'tacc_ns_tt', 'tcycle_ns_tt', 'tsetup_ns_tt', 'thold_ns_tt', 'read_power_pj_tt', 'write_power_pj_tt', 'leakage_power_mw_ffg', 'leakage_power_mw_ssg', 'leakage_power_mw_tt']

function getDifference(num1, num2) {
  var difference = num1 - num2;
  var average = num1 + num2 / 2;
  var percentageDifference = difference / average * 100;

  if (Number.isInteger(percentageDifference)) {
    return percentageDifference;
  }

  return percentageDifference.toFixed(2);
}

function formatNumber(number) {
  const decimalPart = number % 1;

  if (decimalPart > 0 && decimalPart.toFixed(3) == 0) {
    return number.toExponential(2);
  } else {
    return number.toFixed(3);
  }
}


export default function CompareTable({ selectedData }) {
  const selectedDataKeys = Object.keys(selectedData);

  // console.log(selectedDataKeys)

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell
                style={{ minWidth: 180 }}
              >
                Predictions
              </TableCell>
              {selectedDataKeys.length > 0 && selectedDataKeys.map((column, index) => (
                <TableCell
                  key={index}
                  style={{ minWidth: 180 }}
                >
                  {column?.length > 12 ? <Tooltip title={column}><span>{column.slice(0, 12) + "..."}</span></Tooltip> : column}
                </TableCell>
              ))}
              {selectedDataKeys.length === 2 &&
                <TableCell
                  style={{ minWidth: 180 }}
                >
                  % Difference
                </TableCell>
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => {
              return (
                <TableRow hover tabIndex={-1} key={i}>
                  <TableCell>
                    {row}
                  </TableCell>
                  {selectedDataKeys.length > 0 && selectedDataKeys.map((column, index) => (
                    <TableCell
                      key={index}
                      style={{ minWidth: 180 }}
                    >
                      {
                        typeof JSON.parse(selectedData[column])[row] !== "number" || row === "Words" || row === "Bits" ?
                          JSON.parse(selectedData[column])[row] : formatNumber(JSON.parse(selectedData[column])[row])
                      }
                    </TableCell>
                  ))}
                  {
                    selectedDataKeys.length === 2 &&

                    <TableCell>
                      {
                        typeof JSON.parse(selectedData[selectedDataKeys[0]])[row] === "number" && typeof JSON.parse(selectedData[selectedDataKeys[1]])[row] === "number" ?
                          getDifference(
                            JSON.parse(selectedData[selectedDataKeys[0]])[row],
                            JSON.parse(selectedData[selectedDataKeys[1]])[row]
                          )
                          : "-"
                      }
                    </TableCell>
                  }
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}