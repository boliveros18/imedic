import {
  FC,
  ReactNode,
  useContext,
  useState,
  ChangeEvent,
  FormEvent,
  useEffect,
} from "react";
import { useRouter } from "next/router";
import AccordionUi from "../ui/utils/AccordionUi";
import { Alert, Grid, MenuItem } from "@mui/material";
import { ClinicContext } from "../../context/clinic";
import { UIContext } from "../../context/ui";
import { Clinic, Medic } from "../../interfaces";
import { SelectUi } from "../ui/utils/SelectUi";
import SelectUbication from "../ui/utils/SelectUbication";
import { Category } from "../../utils/medic-category/lib";
import { useSnackbar } from "notistack";
import { capitalize, formatPhone } from "../../utils/strings";
import { clinic } from "../../utils/constants";
import ManageButtons from "../ui/utils/ManageButtons";
import TextFieldUi from "../ui/utils/TextFieldUi";
import { isFilledInputsForm } from "../../utils/validations";

interface Props {
  children?: ReactNode;
  medic: Medic;
}

export const ManageClinics: FC<Props> = ({ medic }) => {
  const router = useRouter();
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
  const [create, onCreate] = useState(true);
  const [values, setValues] = useState(clinic);

  useEffect(() => {
    getClinicsByMedicId(medic._id);
  }, [medic, getClinicsByMedicId]);

  const successService = async (state: string) => {
    await getClinicsByMedicId(medic._id);
    setValues(clinic);
    setIndex(0);
    setCategory("Category");
    setCountry(clinic.country);
    setState(clinic.state);
    setCity(clinic.city);
    onCreate(true);
    setSubmit("CREATE");
    setProgress(false);
    enqueueSnackbar(`Your clinic has been ${state}!`, {
      variant: "success",
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submit === "SAVE" && clinics) {
      try {
        setProgress(true);
        await updateClinic(clinics[index]._id || "", {
          ...values,
          category: category,
          country: country,
          state: state,
          city: city
        } as Clinic).then(async () => {
          successService("updated");
        });
      } catch (error: any) {
        setProgress(false);
        enqueueSnackbar(`${error}`, { variant: "error" });
      }
    } else {
      try {
        setProgress(true);
        const filledInputsForm = isFilledInputsForm({
          medic_id: medic._id,
          name: values.name,
          phone: formatPhone(values.phone),
          address: values.address,
          instagram: values.instagram,
          finantial: values.finantial,
          technology: values.technology,
          category: category,
          country: country,
          state: state,
          city: city
        }  as Clinic, clinic);
        await createClinic(filledInputsForm);
        successService("created");
      } catch (error: any) {
        setProgress(false);
        enqueueSnackbar(`${error}`, { variant: "error" });
      }
    }
    setProgress(false);
  };

  const SupressClinic = async () => {
    try {
      setProgress(true);
      await deleteClinic(clinics[index]?._id || "").then(async () => {
        successService("deleted");
        router.reload();
      });
    } catch (error) {
      setProgress(false);
      enqueueSnackbar(`${error}`, { variant: "error" });
    }
    setProgress(false);
  };

  const handleInput = ({ target }: ChangeEvent<any>) => {
    setValues({ ...values, [target.name]: target.value });
  };

  return (
    <AccordionUi summary="Manage Clinics">
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
                  setValues(clinic);
                  setIndex(0);
                  setCategory("Category");
                  setCountry(clinic.country);
                  setState(clinic.state);
                  setCity(clinic.city);
                  onCreate(true);
                  setSubmit("CREATE");
                }}
              >
                Clinics
              </MenuItem>
              {clinics?.map((item, index) => (
                <MenuItem
                  key={index}
                  value={item.name}
                  onClick={() => {
                    setSubmit("SAVE");
                    onCreate(false);
                    setValues(item);
                    setIndex(index);
                    setCategory(item.category);
                    setCountry(item.country);
                    setState(item.state);
                    setCity(item.city);
                  }}
                >
                  <span style={{ fontWeight: "500" }}>{item.name}</span>
                </MenuItem>
              ))}
            </SelectUi>
          </Grid>
          <TextFieldUi
            submit={submit}
            type="text"
            name="name"
            label="Clinic name"
            value={capitalize(values.name)}
            onChange={handleInput}
          />
          <TextFieldUi
            submit={submit}
            type="text"
            name="phone"
            label={submit === "SAVE" ? "Phone" : "Phone example: 5556554658"}
            value={values.phone}
            onChange={handleInput}
          />
          <TextFieldUi
            submit={submit}
            type="text"
            name="address"
            label={
              submit === "SAVE"
                ? "Address"
                : "Address example: 1903 W Michigan Ave"
            }
            value={capitalize(values.address)}
            onChange={handleInput}
          />
          <TextFieldUi
            submit={submit}
            type="text"
            name="instagram"
            label="Instagram link"
            value={values.instagram}
            onChange={handleInput}
          />
          <TextFieldUi
            submit={submit}
            type="text"
            name="finantial"
            label={
              submit === "SAVE"
                ? "Finantial situation"
                : "Finantial situation example: 1 million US in 2022"
            }
            value={values.finantial}
            onChange={handleInput}
          />
          <TextFieldUi
            submit={submit}
            type="text"
            name="technology"
            label={
              submit === "SAVE"
                ? "Technology implemented"
                : "Technology implemented example: Animation Deformity, Laser, Water assisted body jet, etc."
            }
            value={values.technology}
            onChange={handleInput}
          />
          <Grid item xs={12}>
            <SelectUi>
              <MenuItem value={""}>{category}</MenuItem>
              {Category.getAllCategories().map((item, index) => (
                <MenuItem
                  key={index}
                  value={item.name || ""}
                  onClick={() => {
                    setCategory(item.name);
                  }}
                >
                  {item.name}
                </MenuItem>
              ))}
            </SelectUi>
          </Grid>
          <Grid item xs={12}>
            <SelectUbication content={values} />
          </Grid>
          <Grid item xs={12}>
            <ManageButtons
              suppress={SupressClinic}
              create={create}
              submit={submit}
              type="clinic"
            />
          </Grid>
        </Grid>
      </form>
    </AccordionUi>
  );
};

export default ManageClinics;
