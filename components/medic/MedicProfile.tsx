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
import SelectUbication from "../ui/utils/SelectUbication";
import AddDocumentMedicProfile from "./AddDocumentMedicProfile";
import TextFieldUi from "../ui/utils/TextFieldUi";

interface Props {
  children?: ReactNode;
  medic: Medic;
}

export const CompleteMedicProfile: FC<Props> = ({ medic }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { updateMedic } = useContext(MedicContext);
  const { country, state, city, setProgress } = useContext(UIContext);
  const [value, setValue] = useState(medic);
  const [inputs, setInputs] = useState({});

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setProgress(true);
      await updateMedic(medic._id, {
        ...inputs,
        country: country,
        state: state,
        province: city,
      } as Medic).then(() => {
        setInputs({});
        setProgress(false);
        enqueueSnackbar(`Your medic profile has been updated!`, { variant: "success" });
     
      });
    } catch (error: any) {
      setProgress(false);
      enqueueSnackbar("Error, try again!", { variant: "error" });
    }
 
  };

  const handleInput = ({ target }: ChangeEvent<any>) => {
    setValue(target.value);
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
              value={value.instagram}
              onChange={handleInput}
            />
          <Grid item xs={12}>
            <SelectUbication content={medic} />
          </Grid>
          <Grid container spacing={0} rowSpacing={2}>
            <Grid item xs={12} sx={{ mt: "5px" }}>
              <AddDocumentMedicProfile
                type="card_id"
                text="Apostille card id PDF: "
              />
              <AddDocumentMedicProfile
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
