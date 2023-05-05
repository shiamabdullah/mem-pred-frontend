import { Typography } from "@mui/material";

const Label = ({ className, ...rest }) => {
  return (
    <Typography
      className=
      "block text-[#6A5ACD] font-medium text-base leading-none mb-3"
      {...rest}
    />
  );
};

export default Label;
