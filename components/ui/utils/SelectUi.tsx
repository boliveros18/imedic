import { FC, ReactNode, useState } from "react";
import { Select, SelectChangeEvent } from "@mui/material";

interface Props {
  children?: ReactNode;
}

export const SelectUi: FC<Props> = ({ children }) => {
  const [selected, setSelected] = useState("");
  const handleChange = (event: SelectChangeEvent) => {
    if(selected !== ""){
      setSelected(event.target.value as string);
    }
  };

  return (
    <Select
      fullWidth
      size="small"
      sx={{
        minWidth: 65,
        boxShadow: "none",
        ".MuiOutlinedInput-notchedOutline": {
          borderColor: "#CFCFCF !important",
        },
        backgroundColor: "white",
      }}
      value={selected}
      displayEmpty
      inputProps={{ "aria-label": "Without label" }}
      onChange={handleChange}
    >
      {children}
    </Select>
  );
};

export default SelectUi;
