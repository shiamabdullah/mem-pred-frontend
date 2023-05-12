import { Divider, ListItem, ListItemText } from "@mui/material";
import React from "react";

const BuildOutputResult = ({ data }) => {
  // console.log(data)

  const properties = Object.entries(data);

  const subTitle =
    data?.Banks && data?.Mux
      ? `(Banks : ${data?.Banks}, Mux : ${data?.Mux})`
      : "";

  const propertyRows = properties.map(([key, value], i) => {
    if (!Boolean(value)) {
      return null;
    } else {
      return (
        <React.Fragment key={i}>
          <ListItem key={key} className="flex justify-between pt-3">
            <ListItemText className="text-[#838383] text-sm">
              {key}
            </ListItemText>
            <div className="text-[#838383]">
              <ListItemText>
                {typeof value === "number" && value % 1 !== 0
                  ? value.toFixed(3)
                  : value}
              </ListItemText>
            </div>
          </ListItem>
          <Divider />
        </React.Fragment>
      );
    }
  });

  return (
    <div className="px-4">
      <div className="mb-5">
        <p className="text-xl px-5 text-[#753EFE] mb-1 font-medium">
          Predictions {subTitle}{" "}
        </p>
        <Divider />
      </div>

      <div className="mb-5 px-2">{propertyRows}</div>
    </div>
  );
};

export default BuildOutputResult;
