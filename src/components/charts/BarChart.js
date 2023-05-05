import React from "react";
import Plot from "react-plotly.js";

const BarChart = ({ data, layout }) => {
  
  return (
    <Plot
      data={data}
      layout={layout}
      style={{ width: "100%", height: "80%" }}
    />
  );
};

export default BarChart;
