import { Button, TextField } from "@mui/material";
import {
  BEOLTYPE,
  BIASTYPE,
  DESIGNTYPE,
  PROCESSTYPE,
  TRACKTYPE,
} from "../../../utils/data/logic-prediction-data";
import Label from "../../helper-component/label";
import Loader from "../../helper-component/loader";
import SelectInput from "../../helper-component/select-input";

export default function LogicPredictionInputs({
  onSubmit,
  handleOnChange,
  loading,
  handleReset,
  predictionInput,
}) {
  // console.log({ predictionInput });
  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-6">
        <div className="mb-4">
          <Label>Design*</Label>
          <SelectInput
            name="design"
            options={DESIGNTYPE}
            predictionInput={predictionInput}
            value={predictionInput?.design}
            handleOnChange={handleOnChange}
          />
        </div>

        <div className="mb-4">
          <Label>Frequency (GHZ) *</Label>
          <TextField
            fullWidth
            name="frequency"
            variant="outlined"
            type="number"
            onChange={handleOnChange}
            min="0.000"
            step="0.001"
            presicion={2}
            value={predictionInput?.frequency || ""}
          />
        </div>
        <div className="mb-4">
          <Label>Vnom (V) *</Label>
          <TextField
            name="vnom"
            type="number"
            fullWidth
            onChange={handleOnChange}
            min="0.000"
            step="0.001"
            presicion={2}
            value={predictionInput?.vnom || ""}
          />
        </div>

        <div className="mb-4">
          <Label>Track*</Label>
          <SelectInput
            required
            name="track"
            handleOnChange={handleOnChange}
            options={TRACKTYPE}
            value={predictionInput?.track}
            predictionInput={predictionInput}
          />
        </div>

        <div className="mb-4">
          <Label>Beol*</Label>
          <SelectInput
            required
            name="beol"
            handleOnChange={handleOnChange}
            options={BEOLTYPE}
            defaultValue={""}
            value={predictionInput?.beol}
            predictionInput={predictionInput}
          />
        </div>
        <div className="mb-4">
          <Label>Process *</Label>
          <SelectInput
            required
            name="process"
            handleOnChange={handleOnChange}
            options={PROCESSTYPE}
            defaultValue={""}
            value={predictionInput?.process}
            predictionInput={predictionInput}
          />
        </div>

        <div className="mb-4">
          <Label>BIAS *</Label>
          <SelectInput
            required
            name="bias"
            handleOnChange={handleOnChange}
            options={BIASTYPE}
            defaultValue={""}
            value={predictionInput?.bias}
            predictionInput={predictionInput}
          />
        </div>
      </div>
      <div className="flex w-full items-center justify-center gap-6 mt-5">
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
