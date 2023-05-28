import {
  FC,
  ReactNode,
  useContext,
  useState,
  ChangeEvent,
  FormEvent,
  useEffect,
} from "react";
import AccordionUi from "../utils/AccordionUi";
import {
  Alert,
  Grid,
  TextField,
  MenuItem,
} from "@mui/material";
import { ClinicContext } from "../../../context/clinic";
import { UIContext } from "../../../context/ui";
import { Clinic, Medic } from "../../../interfaces";
import SelectUbication from "../utils/SelectUbication";
import { SelectUi } from "../utils/SelectUi";
import { Categories } from "../../../utils/category";
import { useSnackbar } from "notistack";
import { capitalize, formatPhone } from "../../../utils/strings";
import ManageButtons from "../utils/ManageButtons";

interface Props {
  children?: ReactNode;
  medic: Medic;
}

export const ManageClinics: FC<Props> = ({ medic }) => {
  const { enqueueSnackbar } = useSnackbar();
  const {
    clinics,
    createClinic,
    updateClinic,
    deleteClinic,
    getClinicsByMedicId,
  } = useContext(ClinicContext);
  const { country, state, city, setProgress, setCountry, setState, setCity } =
    useContext(UIContext);
  const [index, setIndex] = useState(0);
  const [category, setCategory] = useState("Category");
  const [submit, setSubmit] = useState("CREATE");
  const [open, setOpen] = useState(false);
  const [create, onCreate] = useState(true);

  const clinic = {
    finantial: "",
    technology: "",
    phone: "",
    name: "",
    address: "",
    instagram: "",
    country: "Select country",
    state: "Select state",
    province: "Select city",
  } as Clinic;
  const [values, setValues] = useState(clinic);
  const [inputs, setInputs] = useState({} as Clinic);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const success = (model: string, state: string) => {
    setProgress(false);
    enqueueSnackbar(`Your ${model} has been ${state}!`, { variant: "success" });
  };

  const unsuccess = (error: any) => {
    setProgress(false);
    enqueueSnackbar("Error, try again!", { variant: "error" });
    console.log({ error });
  };

  useEffect(() => {
    getClinicsByMedicId(medic._id);
  }, [medic, getClinicsByMedicId]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submit === "SAVE" && clinics) {
      try {
        setProgress(true);
        await updateClinic(clinics[index]._id || "", {
          ...inputs,
          speciality: category,
          country: country,
          state: state,
          province: city,
        } as Clinic).then(() => {
          setInputs({} as Clinic);
          getClinicsByMedicId(medic._id);
          success("clinic", "updated");
        });
      } catch (error: any) {
        unsuccess(error);
      }
    } else {
      try {
        setProgress(true);
        await createClinic({
          ...inputs,
          name: capitalize(inputs.name),
          phone: formatPhone(inputs.phone),
          medic_id: medic._id,
          speciality: category,
          country: country,
          state: state,
          province: city,
        } as Clinic).then(() => {
          getClinicsByMedicId(medic._id);
          setValues(clinic);
          success("clinic", "created");
        });
      } catch (error: any) {
        unsuccess(error);
      }
    }
    setProgress(false);
  };

  const SupressClinic = async () => {
    try {
      setProgress(true);
      await deleteClinic(clinics[index]?._id || "").then(async () => {
        await getClinicsByMedicId(medic._id);
        setSubmit("CREATE");
        setValues(clinic);
        setInputs({} as Clinic);
        setIndex(0);
        setCategory("Category");
        setCountry(clinic.country);
        setState(clinic.state);
        setCity(clinic.province);
        success("clinic", "deleted");
      });
    } catch (error) {
      unsuccess(error);
    }
    onCreate(true);
    setProgress(false);
  };

  const handleInput = ({ target }: ChangeEvent<any>) => {
    setValues({ ...values, [target.name]: target.value });
    const value = target.type === "checkbox" ? target.checked : target.value;
    setInputs({ ...inputs, [target.name]: value });
  };

  return (
    <AccordionUi summary="Manage clinics">
      <form onSubmit={handleSubmit} noValidate>
        <Grid container spacing={0} rowSpacing={2}>
          <Grid item xs={12}>
            {
              <Alert severity={create ? "success" : "info"}>
                {`${create ? "Create" : "Update"} a clinic`}
              </Alert>
            }
          </Grid>
          <Grid item xs={12}>
            <SelectUi>
              <MenuItem
                value={""}
                onClick={() => {
                  setSubmit("CREATE");
                  onCreate(true);
                  setValues(clinic);
                  setInputs({} as Clinic);
                  setCategory("Category");
                  setCountry(clinic.country);
                  setState(clinic.state);
                  setCity(clinic.province);
                }}
              >
                Clinics
              </MenuItem>
              {clinics?.map((item, index) => (
                <MenuItem
                  key={index}
                  value={item.name}
                  onClick={() => {
                    setValues(item);
                    setIndex(index);
                    setInputs({} as Clinic);
                    setSubmit("SAVE");
                    onCreate(false);
                    setCategory(item.speciality);
                    setCountry(item.country);
                    setState(item.state);
                    setCity(item.province);
                  }}
                >
                  <span style={{ fontWeight: "500" }}>{item.name}</span>
                </MenuItem>
              ))}
            </SelectUi>
          </Grid>
          <Grid item xs={12}>
            <TextField
              InputLabelProps={{ shrink: true }}
              required={submit === "SAVE" ? false : true}
              type="text"
              name="name"
              label="Clinic name"
              variant="outlined"
              fullWidth
              autoComplete="off"
              value={values.name}
              onChange={handleInput}
              size="small"
              error={!values.name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              InputLabelProps={{ shrink: true }}
              required={submit === "SAVE" ? false : true}
              type="text"
              name="phone"
              label={submit === "SAVE" ? "Phone" : "Phone example: 5556554658"}
              variant="outlined"
              fullWidth
              autoComplete="off"
              value={values.phone}
              onChange={handleInput}
              size="small"
              error={!values.phone}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              InputLabelProps={{ shrink: true }}
              required={submit === "SAVE" ? false : true}
              type="text"
              name="address"
              label={
                submit === "SAVE"
                  ? "Address"
                  : "Address example: 1903 W Michigan Ave"
              }
              variant="outlined"
              fullWidth
              autoComplete="off"
              value={values.address}
              onChange={handleInput}
              size="small"
              error={!values.address}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              InputLabelProps={{ shrink: true }}
              required={submit === "SAVE" ? false : true}
              type="text"
              name="instagram"
              label="Instagram link"
              variant="outlined"
              fullWidth
              autoComplete="off"
              value={values.instagram}
              onChange={handleInput}
              size="small"
              error={!values.instagram}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              InputLabelProps={{ shrink: true }}
              required={submit === "SAVE" ? false : true}
              type="text"
              name="finantial"
              label={
                submit === "SAVE"
                  ? "Finantial situation"
                  : "Finantial situation example: 1 million US in 2022"
              }
              variant="outlined"
              fullWidth
              autoComplete="off"
              value={values.finantial}
              onChange={handleInput}
              size="small"
              error={!values.finantial}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              InputLabelProps={{ shrink: true }}
              required={submit === "SAVE" ? false : true}
              type="text"
              name="technology"
              label={
                submit === "SAVE"
                  ? "Technology implemented"
                  : "Technology implemented example: Animation Deformity, Laser, Water assisted body jet, etc."
              }
              variant="outlined"
              fullWidth
              autoComplete="off"
              value={values.technology}
              onChange={handleInput}
              size="small"
              error={!values.technology}
            />
          </Grid>
          <Grid item xs={12}>
            <SelectUi>
              <MenuItem value={""}>{category}</MenuItem>
              {Categories.map((item, index) => (
                <MenuItem
                  key={index}
                  value={item}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </MenuItem>
              ))}
            </SelectUi>
          </Grid>
          <Grid item xs={12}>
            <SelectUbication content={values} />
          </Grid>
          <Grid item xs={12}>
          <ManageButtons suppress={SupressClinic}  create = {create} submit = {submit} type = "clinic" />
          </Grid>
        </Grid>
      </form>
    </AccordionUi>
  );
};

export default ManageClinics;
