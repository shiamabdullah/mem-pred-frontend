// @flow strict

import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import * as React from 'react';
import Label from './label';

function LabelWithOptions({ label, onChange, defaultValue }) {

  return (
    <div className="flex justify-between items-center p-0 m-0">
      <Label className="mb-0">{label}</Label>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        className="mb-0 p-0 -mt-3"
        value={defaultValue || ''}
        onChange={(e) => onChange(e.target.value)}
      >
        <FormControlLabel
          value="specific"
          control={<Radio className="p-0 mx-1" size="small" />}
          label="Specific Value" />
        <FormControlLabel
          value="range"
          className="mr-1 pr-0"
          control={<Radio className="p-0 mx-1" size="small" />}
          label="Range" />
      </RadioGroup>
    </div>
  );
};

export default LabelWithOptions;