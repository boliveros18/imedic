import {
    FC
  } from "react";
  import {
    Grid,
    TextField
  } from "@mui/material";

interface Props {
    submit?: string;
    InputProps?: any;
    name: string;
    label: string;
    value: string | number;
    onChange: any;
    type: string; 
  }
  
  export const TextFieldUi: FC<Props> = ({submit, name, type, label, value, onChange, InputProps}) => {
    return(
      <Grid item xs={12}>
      <TextField
      InputLabelProps={{ shrink: true }}
      required={submit === "SAVE" ? false : true}
      InputProps={InputProps}
      type={type}
      name={name}
      label={label}
      variant="outlined"
      fullWidth
      autoComplete="off"
      value={value}
      onChange={onChange}
      size="small"
      error={(submit === "SAVE" ? false : true) && !value}
    />
    </Grid>
    )
  }

  export default TextFieldUi