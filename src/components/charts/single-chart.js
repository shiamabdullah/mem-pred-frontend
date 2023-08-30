// @flow strict

import { Divider } from '@mui/material';
import * as React from 'react';
import BarChart from './BarChart';

function SingleChart({ multipleOutput, keyword }) {
  let colors = []
  const findValues = () => {
    let values = [];
    multipleOutput.forEach(element => {
      values.push(element[keyword]);
    });
    return values;
  }

  const findCombinedData = () => {
    let values = [];
    multipleOutput.forEach(element => {
      values.push('(' + element['Mux'] + ',' + element['Banks'] + ')');
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);
      colors.push('#' + randomColor);
    });
    return values;
  }

  const getRandomColors = () => {
    const isLightColor = (red, green, blue) => {
      const brightness = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;
      return brightness > 0.5;
    };

    const values = [];
    const maxAttempts = 100;
    let attempts = 0;

    while (values.length < multipleOutput.length && attempts < maxAttempts) {
      const randomColor = Math.floor(Math.random() * 16777215);
      const red = (randomColor >> 16) & 255;
      const green = (randomColor >> 8) & 255;
      const blue = randomColor & 255;
      if (!isLightColor(red, green, blue)) {
        values.push(`#${randomColor.toString(16).padStart(6, '0')}`);
      }
      attempts++;
    }

    return values;
  };

  const X_AXIS_DATA = findCombinedData()
  const Y_AXIS_DATA = findValues();

  const chartDesign = {
    autosize: true,
    margin: {
      l: 50, // add some margin to the left side of the chart
      r: 50, // add some margin to the right side of the chart
      b: 80, // add some margin to the bottom of the chart
      t: 20, // add some margin to the top of the chart
      pad: 4, // add padding between the plot and the edge of the container
    },
  };

  return (
    <div className="shadow-[0_5px_20px_rgba(0,0,0,0.05)] px-4 h-[380px] rounded-lg">
      <div className="mb-5">
        <p className="text-xl px-2 text-[#753EFE] mb-1 font-medium">
          {keyword}
        </p>
        <Divider />
      </div>
      <BarChart
        data={[
          {
            x: X_AXIS_DATA,
            y: Y_AXIS_DATA,
            type: "bar",
            marker: {
              color: getRandomColors(),
            },
          },
        ]}
        layout={{
          ...chartDesign,
        }}
      />
    </div>
  );
};

export default SingleChart;