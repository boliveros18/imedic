import {
  FC,
  ReactNode,
  useContext,
  useState,
  ChangeEvent,
  FormEvent,
} from "react";
import AccordionUi from "../ui/utils/AccordionUi";
import { Grid, Button } from "@mui/material";
import { MedicContext } from "../../context/medic";
import { UIContext } from "../../context/ui";
import { Medic } from "../../interfaces";
import { useSnackbar } from "notistack";
import AddDocumentMedicProfile from "./AddDocumentMedicProfile";
import TextFieldUi from "../ui/utils/TextFieldUi";

interface Props {
  children?: ReactNode;
  medic: Medic;
}

export const CompleteMedicProfile: FC<Props> = ({ medic }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { updateMedic } = useContext(MedicContext);
  const { setProgress } = useContext(UIContext);
  const [values, setValues] = useState(medic);
  const [inputs, setInputs] = useState({});

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setProgress(true);
      await updateMedic(medic._id, {
        ...inputs,
      } as Medic).then(() => {
        setInputs({});
        setProgress(false);
        enqueueSnackbar(`Your medic profile has been updated!`, {
          variant: "success",
        });
      });
    } catch (error: any) {
      setProgress(false);
      enqueueSnackbar("Error, try again!", { variant: "error" });
    }
  };

  const handleInput = ({ target }: ChangeEvent<any>) => {
    setValues({ ...values, [target.name]: target.value });
    const value = target.type === "checkbox" ? target.checked : target.value;
    setInputs({ ...inputs, [target.name]: value });
  };

  return (
    <AccordionUi summary="Medic Profile">
      <form onSubmit={handleSubmit} noValidate>
        <Grid container spacing={0} rowSpacing={2}>
          <TextFieldUi
            submit="SAVE"
            type="text"
            name="instagram"
            label="Instagram link"
            value={values.instagram}
            onChange={handleInput}
          />
          <TextFieldUi
            submit="SAVE"
            type="number"
            name="age"
            label="Your age"
            value={values.age}
            onChange={handleInput}
          />{" "}
          <TextFieldUi
            submit="SAVE"
            type="text"
            name="years_experience"
            label="Years of experience as a specialist"
            value={values.years_experience}
            onChange={handleInput}
          />
          <Grid container spacing={0} rowSpacing={2}>
            <Grid item xs={12} sx={{ mt: "5px" }}>
              <AddDocumentMedicProfile
                handleSubmit={handleSubmit}
                medic={medic}
                type="card_id"
                text="Apostille card id PDF: "
              />
              <AddDocumentMedicProfile
                handleSubmit={handleSubmit}
                medic={medic}
                type="curriculum"
                text="Curriculum vitae PDF: "
              />
            </Grid>
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="center">
            <Button
              type="submit"
              variant="outlined"
              size="medium"
              color="primary"
              sx={{
                width: "90%",
                color: "black",
              }}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </AccordionUi>
  );
};

export default CompleteMedicProfile;
