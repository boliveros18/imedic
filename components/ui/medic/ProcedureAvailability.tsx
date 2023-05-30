import { FC, ReactNode, useState } from "react";
import DatePicker from "react-multi-date-picker";
import { Typography, Divider, Grid } from "@mui/material";
import EventIcon from '@mui/icons-material/Event';

interface Props {
  children?: ReactNode;
}

export const ProcedureAvailability: FC<Props> = ({}) => {
  const [values, setValues] = useState<any>([]);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  console.log(values);
  return (
    <>
      <Divider />
      <Typography
        sx={{
          fontSize: 15,
          fontWeight: "500",
          borderRadius: 0,
          color: "#001B87",
          marginTop: 1.5,
          marginLeft: 2,
          marginBottom: 1.5,
        }}
      >
        Procedures availability
      </Typography>
      <Grid container spacing={0} rowSpacing={2}>
      <Grid item xs={1}>
        </Grid>
        <Grid item xs={1}>
          <EventIcon />
        </Grid>
        <Grid item xs={3}>
          <Typography sx={{ fontSize: 14 }}>
            Availables: 
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <DatePicker
            multiple
            value={values}
            onChange={setValues}
            sort
            minDate={tomorrow}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ProcedureAvailability;
