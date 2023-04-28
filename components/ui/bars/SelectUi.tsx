import { FC, ReactNode, useState } from "react";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { Categories } from "../../../utils/category";

interface Props {
  children?: ReactNode;
}

export const SelectUi: FC<Props> = ({}) => {
  const [procedure, setProcedure] = useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setProcedure(event.target.value as string);
  };
  return (
    <Select
      size="small"
      sx={{
        minWidth: 65,
        boxShadow: "none",
        ".MuiOutlinedInput-notchedOutline": { border: "none" },
        backgroundColor: "white",
      }}
      value={procedure}
      displayEmpty
      inputProps={{ "aria-label": "Without label" }}
      onChange={handleChange}
    >
      <MenuItem value={""}>All</MenuItem>
      {Categories.map((item, index) => (
        <MenuItem key={index} value={item}>
          {item}
        </MenuItem>
      ))}
    </Select>
  );
};
