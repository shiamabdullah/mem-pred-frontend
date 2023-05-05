import { Divider } from "@mui/material";
import React from "react";
import BarChart from "./BarChart";


const ChartsContainer = ({ data }) => {
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

  const X_AXIS_TIME = [
    "tacc_ns_tt",
    "tacc_ns_ssg",
    "tcycle_ns_tt",
    "tcycle_ns_ssg",
  ];

  const Y_AXIS_TIME = [
    data?.tacc_ns_tt,
    data?.tacc_ns_ssg,
    data?.tcycle_ns_tt,
    data?.tcycle_ns_ssg,
  ];

  const X_AXIS_LEAKAGE = [
    "leakage_power_mw_ffg",
    "leakage_power_mw_tt",
  ]

  const X_AXIS_POWER = [
    "read_power_pj_ffg",
    "write_power_pj_ffg",
    "read_power_pj_tt",
    "write_power_pj_tt",
  ];

  const Y_AXIS_LEAKAGE =[
    data?.leakage_power_mw_ffg,
    data?.leakage_power_mw_tt,
  ]

  const Y_AXIS_POWER = [
    data?.read_power_pj_ffg,
    data?.write_power_pj_ffg,
    data?.read_power_pj_tt,
    data?.write_power_pj_tt,
  ];

  return (
    <>
      <div className="shadow-[0_5px_20px_rgba(0,0,0,0.05)] px-4 h-[380px] rounded-lg">
        <div className="mb-5">
          <p className="text-xl px-2 text-[#753EFE] mb-1 font-medium">
            Access/Cycle Time (ns)
          </p>
          <Divider />
        </div>
        <BarChart
          data={[
            {
              x: X_AXIS_TIME,
              y: Y_AXIS_TIME,
              type: "bar",
              marker: {
                color: ['#A06BFF', '#DB3899', '#F4568E', '#F7CD60'],
              },
            },
          ]}
          layout={{
            ...chartDesign,
          }}
        />
      </div>

      <div className="shadow-[0_5px_20px_rgba(0,0,0,0.05)] px-4 h-[380px] rounded-lg">
        <div className="mb-5">
          <p className="text-xl px-2 text-[#753EFE] mb-1 font-medium">
            Leakage Power(mW)
          </p>
          <Divider />
        </div>
        <BarChart
          data={[
            {
              x: X_AXIS_LEAKAGE,
              y: Y_AXIS_LEAKAGE,
              type: "bar",
              marker: {
                color: ['#A06BFF', '#DB3899', '#F4568E', '#F7CD60'],
              },
            },
          ]}
          layout={{
            ...chartDesign,
          }}
        />
      </div>

      <div className="shadow-[0_5px_20px_rgba(0,0,0,0.05)] h-[380px] px-4 rounded-lg">
        <div className="mb-5">
          <p className="text-xl px-2 text-[#753EFE] mb-1 font-medium">
            Read/Write Power
          </p>
          <Divider />
        </div>
        <BarChart
          data={[
            {
              x: X_AXIS_POWER,
              y: Y_AXIS_POWER,
              type: "bar",
              marker: {
                color: ['#8C49FF', '#DB3193', '#FC4986', '#F66D33', '#F8C533', '#C3E975'],
              },
            },
          ]}
          layout={{
            ...chartDesign,
          }}
        />
      </div>
    </>
  );
};

export default ChartsContainer;
