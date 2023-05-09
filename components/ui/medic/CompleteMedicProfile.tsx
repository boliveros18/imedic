import {
  FC,
  ReactNode,
  useContext,
  useState,
  ChangeEvent,
  FormEvent,
} from "react";
import AccordionUi from "../utils/AccordionUi";
import { Grid, TextField, Button, Typography } from "@mui/material";
import { MedicContext } from "../../../context/medic";
import { UIContext } from "../../../context/ui";
import { Medic } from "../../../interfaces";
import SelectUbication from "../utils/SelectUbication";
import AddDocumentMedicProfile from "./AddDocumentMedicProfile";

interface Props {
  children?: ReactNode;
  medic: Medic;
}

export const CompleteMedicProfile: FC<Props> = ({ medic }) => {
  const { updateMedic } = useContext(MedicContext);
  const { country, state, city } = useContext(UIContext);
  const [value, setValue] = useState(medic);
  const [inputs, setInputs] = useState({});

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await updateMedic(medic._id, {
      ...inputs,
      country: country,
      state: state,
      province: city,
    } as Medic).then(() => {
      setInputs({});
    });
  };

  const handleInput = ({ target }: ChangeEvent<any>) => {
    setValue(target.value);
    const value = target.type === "checkbox" ? target.checked : target.value;
    setInputs({ ...inputs, [target.name]: value });
  };

  return (
    <AccordionUi summary="Complete your medic profile">
      <form onSubmit={handleSubmit} noValidate>
        <Grid container spacing={0} rowSpacing={2}>
          <Grid item xs={12}>
            <TextField
              type="text"
              InputLabelProps={{ shrink: true }}
              label="Instagram link"
              variant="outlined"
              fullWidth
              autoComplete="off"
              defaultValue={value.instagram}
              onChange={handleInput}
              name="instagram"
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <SelectUbication content={medic} />
          </Grid>
          <Grid container spacing={0} rowSpacing={2}>
            <Grid item xs={12} sx={{ mt:"5px" }}>
              <AddDocumentMedicProfile
                type="card_id"
                text="Add PDF apostille card id"
              />
              <AddDocumentMedicProfile
                type="curriculum"
                text="Add PDF curriculum vitae"
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
