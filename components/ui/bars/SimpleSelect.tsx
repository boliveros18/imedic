import { FC, ReactNode, useState } from "react";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { Category } from "../../../utils/medic-category/lib";

interface Props {
  children?: ReactNode;
}

export const SimpleSelect: FC<Props> = ({}) => {
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
      {Category.getAllCategories().map((item, index) => (
        <MenuItem key={index} value={item.name}>
          {item.name}
        </MenuItem>
      ))}
    </Select>
  );
};
