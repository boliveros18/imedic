import { FC, ReactNode } from "react";
import { Select, MenuItem, Grid } from "@mui/material";

interface Props {
  children?: ReactNode;
  value: string;
  onChange: any;
  type: string;
}

export const SelectUbicationUi: FC<Props> = ({
  children,
  value,
  onChange,
  type,
}) => {
  return (
    <Grid item xs={12}>
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
        value={value}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        onChange={onChange}
      >
        <MenuItem value={""}>{type}</MenuItem>
        {children}
      </Select>
    </Grid>
  );
};

export default SelectUbicationUi;
