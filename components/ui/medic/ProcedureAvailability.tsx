import { FC, ReactNode, useState, useContext, useEffect } from "react";
import DatePicker from "react-multi-date-picker";
import { Typography, Divider, Grid, Button } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import { UIContext } from "../../../context/ui";
import { CalendarContext } from "../../../context/calendar";
import { useSnackbar } from "notistack";
import { Calendar, Medic } from "../../../interfaces";

interface Props {
  children?: ReactNode;
  medic: Medic;
}

export const ProcedureAvailability: FC<Props> = ({ medic }) => {
  const { setProgress } = useContext(UIContext);
  const { calendar, createCalendar, updateCalendar, getCalendarByMedicId } = useContext(CalendarContext);
  const [values, setValues] = useState<any>(calendar);
  const { enqueueSnackbar } = useSnackbar();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  useEffect(() => {
     getCalendarByMedicId(medic._id);
  }, [medic, getCalendarByMedicId])
  

  const success = (model: string, state: string) => {
    setProgress(false);
    enqueueSnackbar(`Your ${model} has been ${state}!`, { variant: "success" });
  };

  const unsuccess = (error: any) => {
    setProgress(false);
    enqueueSnackbar("Error, try again!", { variant: "error" });
    console.log({ error });
  };

  const handleSubmit = async () => {
    if (calendar) {
      try {
        setProgress(true);
        await updateCalendar(calendar._id || "", {
          availables_dates: values,
        } as Calendar).then(() => {
          success("calendar", "updated");
        });
      } catch (error: any) {
        unsuccess(error);
      }
    } else {
      try {
        setProgress(true);
        await createCalendar({
          medic_id: medic._id,
          availables_dates: values 
        } as Calendar).then(() => {
          success("calendar", "created");
        });
      } catch (error: any) {
        unsuccess(error);
      }
    }
    setProgress(false);
  };

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
        <Grid item xs={1}></Grid>
        <Grid item xs={1}>
          <EventIcon />
        </Grid>
        <Grid item xs={3}>
          <Typography sx={{ fontSize: 14 }}>Availables:</Typography>
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
      <Grid container spacing={0} rowSpacing={2}>
        <Grid item xs={6}>
          <Button
            type="button"
            variant="outlined"
            size="medium"
            sx={{
              width: "90%",
              color: "white",
              backgroundColor: "#ff5757",
              borderColor: "#ff5757",
            }}
            onClick={() => setValues([])}
          >
            Cancel
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            type="submit"
            variant="outlined"
            size="medium"
            sx={{
              width: "100%",
              color: "black",
            }}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ProcedureAvailability;
