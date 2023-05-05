import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const SelectInput = ({ options, name, handleOnChange, defaultValue, value, predictionInput }) => {
  return (
    <FormControl fullWidth>
      {
        !predictionInput[name] && <InputLabel id="demo-simple-select-label">Select {name}</InputLabel>

      }
      <Select
        labelId="demo-simple-select-label"
        value={value || ""}
        name={name}
        onChange={handleOnChange}
      >
        {options?.length > 0 &&
          options.map((option) => (
            <MenuItem className="" key={option.id} value={option.value}>
              {option.name}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default SelectInput;
