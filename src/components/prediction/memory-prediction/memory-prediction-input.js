import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
  TextField,
  Tooltip
} from "@mui/material";
import { CSVLink } from "react-csv";
import { MdOutlineFileDownload } from "react-icons/md";
import { default as csv_headers_12llp, default as csv_headers_22fdx } from "../../../utils/data/csv_headers_12llp";
import {
  HDHSTYPE,
  MEMTYPE,
  PORTTYPE,
  TECH,
  VENDOR,
  VTTYPE
} from "../../../utils/data/memory-prediction-data";
import {
  HDORHS22FDX,
  MEMTYPE22FDX,
  PORTTYPE22FDX,
  VENDOR22FDX,
  VTTYPE22FDX
} from "../../../utils/data/memory-prediction-data-22fdx";
import LabelWithOptions from "../../helper-component/labe-with-options";
import Label from "../../helper-component/label";
import Loader from "../../helper-component/loader";
import SelectInput from "../../helper-component/select-input";

export default function MemoryPredictionInputs({
  onSubmit,
  handleOnChange,
  loading,
  handleReset,
  predictionInput,
  handleChangeAutoComplete,
  setPredictionInput,
  banksRange,
  muxRange,
  optionForWords,
  optionForBits,
  selectedBanks,
  setSelectedBanks,
  selectedMux,
  setSelectedMux,
  fileName,
  setSelectAllValuesForBanks,
  setSelectAllValuesForMux,
  selectModel,
  optionForSelectModel,
  handleChangeModel,
  csvData,
}) {

  return (
    <div className="w-full relative">
      <Tooltip title="Download specs" placement="top">
        <Button className="absolute top-0 right-0">
          {predictionInput?.words || predictionInput?.bits ? (
            <CSVLink
              data={csvData}
              headers={
                predictionInput?.tech === "12LPP"
                  ? csv_headers_12llp
                  : csv_headers_22fdx
              }
              filename={fileName + ".csv"}
              className={`inline-flex items-center`}
            >
              <MdOutlineFileDownload className="text-2xl text-[#F24E1E]" />
            </CSVLink>
          ) : (
            <MdOutlineFileDownload className="text-2xl text-[#F24E1E]" />
          )}
        </Button>
      </Tooltip>

      <div className="grid sm:grid-cols-3 sm:gap-6">
        <div className="mb-4">
          <Label>Tech</Label>
          <SelectInput
            name="tech"
            handleOnChange={handleOnChange}
            predictionInput={predictionInput}
            options={TECH}
            value={predictionInput?.tech}
          />
        </div>

        <div className="mb-4">
          <Label>Vendor</Label>
          <SelectInput
            name="vendor"
            handleOnChange={handleOnChange}
            predictionInput={predictionInput}
            options={predictionInput?.tech === "12LPP" ? VENDOR : VENDOR22FDX}
            value={predictionInput?.vendor}
          />
        </div>

        <div className="mb-4">
          <Label>Mem Type</Label>
          <SelectInput
            name="mem_type"
            handleOnChange={handleOnChange}
            predictionInput={predictionInput}
            options={predictionInput?.tech === "12LPP" ? MEMTYPE : MEMTYPE22FDX}
            value={predictionInput?.mem_type}
          />
        </div>

        <div className="mb-4">
          <Label>Port</Label>
          <SelectInput
            name="port"
            handleOnChange={handleOnChange}
            predictionInput={predictionInput}
            options={
              predictionInput?.tech === "12LPP" ? PORTTYPE : PORTTYPE22FDX
            }
            value={predictionInput?.port}
          />
        </div>

        {predictionInput?.tech === "12LPP" ? (
          <>
            <div className="mb-4">
              <Label>HD_or_HS</Label>
              <SelectInput
                name="hd_or_hs"
                handleOnChange={handleOnChange}
                predictionInput={predictionInput}
                options={HDHSTYPE}
                value={predictionInput?.hd_or_hs}
              />
            </div>

            <div className="mb-4">
              <Label>Vt_Type</Label>
              <SelectInput
                name="vt_type"
                handleOnChange={handleOnChange}
                predictionInput={predictionInput}
                options={VTTYPE}
                value={predictionInput?.vt_type}
              />
            </div>

            <div className="mb-4">
              <Label>Words</Label>
              <Autocomplete
                value={
                  predictionInput?.words
                    ? predictionInput?.words.toString()
                    : ""
                }
                onChange={(event, newValue) =>
                  handleChangeAutoComplete(newValue, "words")
                }
                options={optionForWords.sort((a, b) => a - b)}
                getOptionLabel={(option) => option.toString()}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    type="number"
                    onChange={(e) => {
                      let input = e.target.value;
                      if (
                        !input ||
                        (input[input.length - 1].match("[0-9]") &&
                          input[0].match("[1-9]"))
                      )
                        handleChangeAutoComplete(input, "words");
                    }}
                    label={
                      predictionInput["words"] ? "" : "Select or enter a value"
                    }
                  />
                )}
              />
            </div>

            <div className="mb-4">
              <Label>Bits</Label>
              <Autocomplete
                value={predictionInput?.bits || ""}
                onChange={(event, newValue) =>
                  handleChangeAutoComplete(newValue, "bits")
                }
                options={optionForBits.sort((a, b) => a - b)}
                getOptionLabel={(option) => option.toString()}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    type="number"
                    onChange={(e) => {
                      let input = e.target.value;
                      if (
                        !input ||
                        (input[input.length - 1].match("[0-9]") &&
                          input[0].match("[1-9]"))
                      )
                        handleChangeAutoComplete(input, "bits");
                    }}
                    label={
                      predictionInput["bits"]
                        ? ""
                        : "Select or enter a value. Must be a positive integer"
                    }
                  />
                )}
              />
            </div>

            <div className="mb-4">
              <LabelWithOptions label="Banks" />

              <Paper className="h-14 flex items-center justify-center">
                <FormGroup row>
                  {banksRange.length > 0 &&
                    banksRange.map((item, index) => (
                      <FormControlLabel
                        onChange={(e) => {
                          setSelectedBanks((prevSelectedBanks) => {
                            if (prevSelectedBanks.includes(e.target.value)) {
                              let previousData = prevSelectedBanks.filter(
                                (bank) => bank !== e.target.value
                              );
                              let tempPreviousData;
                              if (e.target.value === "All") {
                                e.target.checked
                                  ? (tempPreviousData = banksRange.map((e) =>
                                    String(e)
                                  ))
                                  : (tempPreviousData = []);
                                const valueWithoutAll = banksRange.slice(0, -1);
                                e.target.checked &&
                                  setSelectAllValuesForBanks(valueWithoutAll);
                              } else {
                                tempPreviousData = previousData;
                              }
                              setPredictionInput((prev) => {
                                const temp = JSON.parse(JSON.stringify(prev));
                                temp["banks"] = tempPreviousData;
                                return temp;
                              });
                              return tempPreviousData;
                            } else {
                              let checkedData = [
                                ...prevSelectedBanks,
                                e.target.value,
                              ];
                              let tempPreviousData;
                              if (e.target.value === "All") {
                                checkedData = banksRange;
                                e.target.checked
                                  ? (tempPreviousData = banksRange.map((e) =>
                                    String(e)
                                  ))
                                  : (tempPreviousData = []);
                                const valueWithoutAll = banksRange.slice(0, -1);
                                e.target.checked &&
                                  setSelectAllValuesForBanks(valueWithoutAll);
                              } else {
                                tempPreviousData = checkedData;
                              }
                              setPredictionInput((prev) => {
                                const temp = JSON.parse(JSON.stringify(prev));
                                temp["banks"] = tempPreviousData;
                                return temp;
                              });
                              return tempPreviousData;
                            }
                          });
                        }}
                        key={index}
                        control={
                          <Checkbox
                            size="small"
                            checked={selectedBanks.includes(item.toString())}
                            value={item}
                          />
                        }
                        label={item}
                      />
                    ))}
                </FormGroup>
              </Paper>
            </div>

            <div className="mb-4">
              <LabelWithOptions label="Mux" />

              <Paper className="h-14 flex items-center justify-center">
                <FormGroup row>
                  {muxRange.length > 0 &&
                    muxRange.map((item, index) => (
                      <FormControlLabel
                        onChange={(e) => {
                          console.log(muxRange);
                          setSelectedMux((prevSelectedMux) => {
                            if (prevSelectedMux.includes(e.target.value)) {
                              let previousData = prevSelectedMux.filter(
                                (mux) => mux !== e.target.value
                              );
                              let tempPreviousData;
                              if (e.target.value === "All") {
                                e.target.checked
                                  ? (tempPreviousData = muxRange.map((e) =>
                                    String(e)
                                  ))
                                  : (tempPreviousData = []);
                                const valueWithoutAll = muxRange.slice(0, -1);
                                e.target.checked &&
                                  setSelectAllValuesForMux(valueWithoutAll);
                              } else {
                                tempPreviousData = previousData;
                              }
                              setPredictionInput((prev) => {
                                const temp = JSON.parse(JSON.stringify(prev));
                                temp["mux"] = tempPreviousData;
                                return temp;
                              });
                              return tempPreviousData;
                            } else {
                              let checkedData = [
                                ...prevSelectedMux,
                                e.target.value,
                              ];
                              let tempPreviousData;
                              if (e.target.value === "All") {
                                checkedData = muxRange;
                                e.target.checked
                                  ? (tempPreviousData = muxRange.map((e) =>
                                    String(e)
                                  ))
                                  : (tempPreviousData = []);
                                const valueWithoutAll = muxRange.slice(0, -1);
                                e.target.checked &&
                                  setSelectAllValuesForMux(valueWithoutAll);
                              } else {
                                tempPreviousData = checkedData;
                              }
                              setPredictionInput((prev) => {
                                const temp = JSON.parse(JSON.stringify(prev));
                                temp["mux"] = tempPreviousData;
                                return temp;
                              });
                              return tempPreviousData;
                            }
                          });
                        }}
                        key={index}
                        control={
                          <Checkbox
                            size="small"
                            checked={selectedMux.includes(item.toString())}
                            value={item}
                          />
                        }
                        label={item}
                      />
                    ))}
                </FormGroup>
              </Paper>
            </div>
          </>
        ) : (
          <>
            <div className="mb-4">
              <Label>HD_or_HS</Label>
              <SelectInput
                name="hd_or_hs"
                handleOnChange={handleOnChange}
                predictionInput={predictionInput}
                options={HDORHS22FDX}
                value={predictionInput?.hd_or_hs}
              />
            </div>

            <div className="mb-4">
              <Label>Vt_Type</Label>
              <SelectInput
                name="vt_type"
                handleOnChange={handleOnChange}
                predictionInput={predictionInput}
                options={VTTYPE22FDX}
                value={predictionInput?.vt_type}
              />
            </div>
            <div className="mb-4">
              <Label>Words</Label>
              <Autocomplete
                value={predictionInput?.words || ""}
                onChange={(event, newValue) =>
                  handleChangeAutoComplete(newValue, "words")
                }
                options={optionForWords.sort((a, b) => a - b)}
                getOptionLabel={(option) => option.toString()}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    type="number"
                    onChange={(e) => {
                      let input = e.target.value;
                      if (
                        !input ||
                        (input[input.length - 1].match("[0-9]") &&
                          input[0].match("[1-9]"))
                      )
                        handleChangeAutoComplete(input, "words");
                    }}
                    label={
                      predictionInput["words"] ? "" : "Select or enter a value"
                    }
                  />
                )}
              />
            </div>

            <div className="mb-4">
              <Label>Bits</Label>
              <Autocomplete
                value={predictionInput?.bits || ""}
                onChange={(event, newValue) =>
                  handleChangeAutoComplete(newValue, "bits")
                }
                options={optionForBits.sort((a, b) => a - b)}
                getOptionLabel={(option) => option.toString()}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    type="number"
                    onChange={(e) => {
                      let input = e.target.value;
                      if (
                        !input ||
                        (input[input.length - 1].match("[0-9]") &&
                          input[0].match("[1-9]"))
                      )
                        handleChangeAutoComplete(input, "bits");
                    }}
                    // onChange={(e) =>
                    //   handleChangeAutoComplete(e.target.value, "bits")
                    // }
                    label={
                      predictionInput["bits"]
                        ? ""
                        : "Select or enter a value. Must be a positive integer"
                    }
                  />
                )}
              />
            </div>

            <div className="mb-4">
              <LabelWithOptions label="Banks" />
              <Paper className="h-14 flex items-center justify-center">
                <FormGroup row>
                  {banksRange.length > 0 &&
                    banksRange.map((item, index) => (
                      <FormControlLabel
                        onChange={(e) => {
                          setSelectedBanks((prevSelectedBanks) => {
                            if (prevSelectedBanks.includes(e.target.value)) {
                              let previousData = prevSelectedBanks.filter(
                                (bank) => bank !== e.target.value
                              );
                              let tempPreviousData;
                              if (e.target.value === "All") {
                                e.target.checked
                                  ? (tempPreviousData = banksRange.map((e) =>
                                    String(e)
                                  ))
                                  : (tempPreviousData = []);
                                const valueWithoutAll = banksRange.slice(0, -1);
                                e.target.checked &&
                                  setSelectAllValuesForBanks(valueWithoutAll);
                              } else {
                                tempPreviousData = previousData;
                              }
                              setPredictionInput((prev) => {
                                const temp = JSON.parse(JSON.stringify(prev));
                                temp["banks"] = tempPreviousData;
                                return temp;
                              });
                              return tempPreviousData;
                            } else {
                              let checkedData = [
                                ...prevSelectedBanks,
                                e.target.value,
                              ];
                              let tempPreviousData;
                              if (e.target.value === "All") {
                                checkedData = banksRange;
                                e.target.checked
                                  ? (tempPreviousData = banksRange.map((e) =>
                                    String(e)
                                  ))
                                  : (tempPreviousData = []);
                                const valueWithoutAll = banksRange.slice(0, -1);
                                e.target.checked &&
                                  setSelectAllValuesForBanks(valueWithoutAll);
                              } else {
                                tempPreviousData = checkedData;
                              }
                              setPredictionInput((prev) => {
                                const temp = JSON.parse(JSON.stringify(prev));
                                temp["banks"] = tempPreviousData;
                                return temp;
                              });
                              return tempPreviousData;
                            }
                          });
                        }}
                        key={index}
                        control={
                          <Checkbox
                            size="small"
                            checked={selectedBanks.includes(item.toString())}
                            value={item}
                          />
                        }
                        label={item}
                      />
                    ))}
                </FormGroup>
              </Paper>
            </div>

            <div className="mb-4">
              <LabelWithOptions label="Mux" />

              <Paper className="h-14 flex items-center justify-center">
                <FormGroup row>
                  {muxRange.length > 0 &&
                    muxRange.map((item, index) => (
                      <FormControlLabel
                        onChange={(e) => {
                          setSelectedMux((prevSelectedMux) => {
                            if (prevSelectedMux.includes(e.target.value)) {
                              let previousData = prevSelectedMux.filter(
                                (mux) => mux !== e.target.value
                              );
                              let tempPreviousData;
                              if (e.target.value === "All") {
                                e.target.checked
                                  ? (tempPreviousData = muxRange.map((e) =>
                                    String(e)
                                  ))
                                  : (tempPreviousData = []);
                                const valueWithoutAll = muxRange.slice(0, -1);
                                e.target.checked &&
                                  setSelectAllValuesForMux(valueWithoutAll);
                              } else {
                                tempPreviousData = previousData;
                              }
                              setPredictionInput((prev) => {
                                const temp = JSON.parse(JSON.stringify(prev));
                                temp["mux"] = tempPreviousData;
                                return temp;
                              });
                              return tempPreviousData;
                            } else {
                              let checkedData = [
                                ...prevSelectedMux,
                                e.target.value,
                              ];
                              let tempPreviousData;
                              if (e.target.value === "All") {
                                checkedData = muxRange;
                                e.target.checked
                                  ? (tempPreviousData = muxRange.map((e) =>
                                    String(e)
                                  ))
                                  : (tempPreviousData = []);
                                const valueWithoutAll = muxRange.slice(0, -1);
                                e.target.checked &&
                                  setSelectAllValuesForMux(valueWithoutAll);
                              } else {
                                tempPreviousData = checkedData;
                              }
                              setPredictionInput((prev) => {
                                const temp = JSON.parse(JSON.stringify(prev));
                                temp["mux"] = tempPreviousData;
                                return temp;
                              });
                              return tempPreviousData;
                            }
                          });
                        }}
                        key={index}
                        control={
                          <Checkbox
                            size="small"
                            checked={selectedMux.includes(item.toString())}
                            value={item}
                          />
                        }
                        label={item}
                      />
                    ))}
                </FormGroup>
              </Paper>
            </div>
          </>
        )}

        <div className="mb-4">
          <Label>VDDPE</Label>
          <TextField
            fullWidth
            id="vddpe"
            name="vddpe"
            type="number"
            value={predictionInput?.vddpe || ""}
            onChange={handleOnChange}
          />
        </div>

        <div className="mb-4">
          <Label>VDDCE</Label>
          <TextField
            fullWidth
            id="vddce"
            name="vddce"
            type="number"
            value={predictionInput?.vddce || ""}
            onChange={handleOnChange}
          />
        </div>

        {/* <div className="mb-4">
          <Label>SELECT MODEL</Label>
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              value={selectModel || ""}
              // name={name}
              onChange={(e) => handleChangeModel(e)}
            >
              {optionForSelectModel?.length > 0 &&
                optionForSelectModel.map((option) => (
                  <MenuItem className="" value={option}>
                    {option}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </div> */}
      </div>

      <div className="flex w-full items-center  justify-center gap-6 mt-5">
        <Button
          onClick={handleReset}
          className="w-32 text-center shadow-sm py-2 rounded-md bg-[#753EFE] text-white"
        >
          Reset
        </Button>
        {!loading ? (
          <Button
            onClick={onSubmit}
            className="w-32 text-center shadow-sm py-2 rounded-md bg-[#F67E4C] text-white"
          >
            Run
          </Button>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}
