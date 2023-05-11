import { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

function BanksInput({ value, handleOnChange }) {
  const [banks, setBanks] = useState(null);
  const [minBanks, setMinBanks] = useState(1);
  const [maxBanks, setMaxBanks] = useState(16);
  const [banksType, setBanksType] = useState("regular");

  const handleBanksRangeChange = (event) => {
    if (event.target.id === "minBanks") {
      setMinBanks(event.target.value);
    } else {
      setMaxBanks(event.target.value);
    }
  };

  const handleBanksTypeChange = (event) => {
    setBanksType(event.target.value);
  };

  return (
    <div>
      <FormControl component="fieldset">
        <FormLabel component="legend">Banks</FormLabel>
        <RadioGroup
          aria-label="banks"
          name="banks"
          value={banksType}
          onChange={handleBanksTypeChange}
        >
          <FormControlLabel
            value="regular"
            control={<Radio />}
            label="Regular"
          />
          <FormControlLabel value="range" control={<Radio />} label="Range" />
        </RadioGroup>
        {banksType === "range" ? (
          <div>
            <TextField
              id="minBanks"
              name="minBanks"
              type="number"
              label="Min"
              value={minBanks}
              onChange={handleBanksRangeChange}
              InputProps={{
                inputProps: { min: 1, max: 16 },
              }}
            />
            <TextField
              id="maxBanks"
              name="maxBanks"
              type="number"
              label="Max"
              value={maxBanks}
              onChange={handleBanksRangeChange}
              InputProps={{
                inputProps: { min: 1, max: 16 },
              }}
            />
          </div>
        ) : (
          <TextField
            id="banks"
            name="banks"
            type="number"
            error={banks > 16 || banks < 1}
            helperText={
              banks > 16 || banks < 1 ? "Number must be between 1 and 16" : ""
            }
            value={value}
            onChange={handleOnChange}
            InputProps={{
              inputProps: { min: 1, max: 16 },
            }}
          />
        )}
      </FormControl>
    </div>
  );
}

export default BanksInput;
