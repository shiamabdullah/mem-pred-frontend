import { Autocomplete, Button, TextField } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import {
  BITS,
  HDHSTYPE,
  MEMTYPE,
  PORTTYPE,
  TECH,
  VENDOR,
  VTTYPE,
  WORDS,
} from "../../../utils/data/memory-prediction-data";
import {
  BITS23FDX,
  MEMTYPE22FDX,
  PORTTYPE22FDX,
  VENDOR22FDX,
  WORDS23FDX,
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
  setPredictionInput
}) {
  // console.log(predictionInput)
  return (
    <div className="w-full">
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
          <Label>Words</Label>
          <Autocomplete
            value={predictionInput?.words || ""}
            onChange={(event, newValue) =>
              handleChangeAutoComplete(newValue, "words")
            }
            options={predictionInput?.tech === "12LPP" ? WORDS : WORDS23FDX}
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
            options={predictionInput?.tech === "12LPP" ? BITS : BITS23FDX}
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

        {predictionInput?.tech === "12LPP" && (
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
              <LabelWithOptions
                defaultValue={predictionInput?.banksType}
                label="Banks"
                onChange={(value) => setPredictionInput((prev) => {
                  const temp = JSON.parse(JSON.stringify(prev));
                  temp['banksType'] = value;
                  return temp;
                })} />
              {
                predictionInput?.banksType === 'specific' ?
                  <TextField
                    fullWidth
                    id="banks"
                    name="banks"
                    type="number"
                    error={
                      predictionInput?.banks > 16 || predictionInput?.banks < 1
                    }
                    helperText={
                      predictionInput?.banks > 16 || predictionInput?.banks < 1
                        ? "Number must be between 1 and 16"
                        : ""
                    }
                    value={predictionInput?.banks || ""}
                    onChange={handleOnChange}
                  /> :
                  <div>
                    <TextField
                      sx={{ mx: 1, width: '12ch' }}
                      type="number"
                      name="banksMin"
                      onChange={handleOnChange}
                      InputProps={{
                        startAdornment:
                          <InputAdornment position="start">Min :</InputAdornment>,
                      }}
                    />
                    <TextField
                      sx={{ mx: 1, width: '12ch' }}
                      type="number"
                      name="banksMax"
                      onChange={handleOnChange}
                      InputProps={{
                        startAdornment:
                          <InputAdornment position="start">Max :</InputAdornment>,
                      }}
                    />
                  </div>
              }
            </div>

            <div className="mb-4">
              <LabelWithOptions
                defaultValue={predictionInput?.muxType}
                label="Mux"
                onChange={(value) => setPredictionInput((prev) => {
                  const temp = JSON.parse(JSON.stringify(prev));
                  temp['muxType'] = value;
                  return temp;
                })}
              />
              {
                predictionInput?.muxType === 'specific' ?

                  <TextField
                    fullWidth
                    id="mux"
                    name="mux"
                    error={predictionInput?.mux > 16 || predictionInput?.mux < 1}
                    helperText={
                      predictionInput?.mux > 16 || predictionInput?.mux < 1
                        ? "Number must be between 1 and 16"
                        : ""
                    }
                    type="number"
                    value={predictionInput?.mux || ""}
                    onChange={handleOnChange}
                  />
                  :
                  <div>
                    <TextField
                      sx={{ mx: 1, width: '12ch' }}
                      type="number"
                      name="muxMin"
                      onChange={handleOnChange}
                      InputProps={{
                        startAdornment:
                          <InputAdornment position="start">Min :</InputAdornment>,
                      }}
                    />
                    <TextField
                      sx={{ mx: 1, width: '12ch' }}
                      type="number"
                      name="muxMax"
                      onChange={handleOnChange}
                      InputProps={{
                        startAdornment:
                          <InputAdornment position="start">Max :</InputAdornment>,
                      }}
                    />
                  </div>
              }
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
