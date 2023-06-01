import { FC, ReactNode, useState, useContext, useEffect, useMemo } from "react";
import DatePicker from "react-multi-date-picker";
import { Typography, Divider, Grid, Button, Box } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import { UIContext } from "../../../context/ui";
import { CalendarContext } from "../../../context/calendar";
import { ProcedureContext } from "../../../context/procedure";
import { useSnackbar } from "notistack";
import { Calendar, Medic } from "../../../interfaces";
import AccordionUi from "../utils/AccordionUi";

interface Props {
  children?: ReactNode;
  medic: Medic;
}

export const ProcedureAvailability: FC<Props> = ({ medic }) => {
  const { calendar, createCalendar, updateCalendar, getCalendarByMedicId } =
    useContext(CalendarContext);
  const { procedures } = useContext(ProcedureContext);
  useEffect(() => {
    getCalendarByMedicId(medic._id);
  }, [medic, getCalendarByMedicId]);

  const { setProgress } = useContext(UIContext);
  const { enqueueSnackbar } = useSnackbar();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [values, setValues] = useState<any>();
  useMemo(() => setValues(calendar.availables_dates), [calendar]);
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
    if (calendar._id) {
      try {
        setProgress(true);
        const allowed = values.filter((value: any) => {
          for (let i = 0; i < procedures.length; i++) {
            return (value.unix*1000+8) !== procedures[i].date 
          }
        })
        await updateCalendar(calendar._id || "", {
          availables_dates: allowed,
          updatedAt: Date.now(),
        } as Calendar).then(() => {
          getCalendarByMedicId(medic._id);
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
          availables_dates: values,
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
    <AccordionUi summary="Procedures Availability">
      <Box>
        <Grid
          container
          spacing={0}
          rowSpacing={2}
          sx={{ marginTop: 0.5, marginBottom: 1.5 }}
        >
          <Grid item xs={1}></Grid>
          <Grid item xs={1}>
            <EventIcon />
          </Grid>
          <Grid item xs={3}>
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: "500",
              }}
            >
              Availability:
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <DatePicker
              multiple
              value={values}
              onChange={setValues} 
              sort
              minDate={tomorrow}
              style={{ width: "100%" }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={0} rowSpacing={2}>
          <Grid item xs={2}></Grid>
          <Grid item xs={3}>
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
              cancel
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              type="submit"
              variant="outlined"
              size="medium"
              sx={{
                width: "100%",
                color: "black",
                backgroundColor: "white",
                marginBottom: 2,
              }}
              onClick={handleSubmit}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Box>
    </AccordionUi>
  );
};

export default ProcedureAvailability;
