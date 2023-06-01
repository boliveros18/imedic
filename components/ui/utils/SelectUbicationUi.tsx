import { FC, ReactNode } from "react";
import { Select, MenuItem, Grid } from "@mui/material";

interface Props {
  children?: ReactNode;
  ubication: string;
  handleChange: any;
  type: string;
}

export const SelectUbicationUi: FC<Props> = ({
  children,
  ubication,
  handleChange,
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
        value={ubication}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        onChange={handleChange}
      >
        <MenuItem value={""}>{type}</MenuItem>
        {children}
      </Select>
    </Grid>
  );
};

export default SelectUbicationUi;
