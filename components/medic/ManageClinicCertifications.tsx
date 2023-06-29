import {
  FC,
  ReactNode,
  useContext,
  useState,
  ChangeEvent,
  FormEvent,
  useEffect,
} from "react";
import AccordionUi from "../ui/utils/AccordionUi";
import { Alert, Grid, MenuItem } from "@mui/material";
import { UIContext } from "../../context/ui";
import { ClinicContext } from "../../context/clinic";
import { Clinic, Certification } from "../../interfaces";
import { SelectUi } from "../ui/utils/SelectUi";
import { useSnackbar } from "notistack";
import { CertificationContext } from "../../context/certification";
import { certification } from "../../utils/constants";
import ManageButtons from "../ui/utils/ManageButtons";
import TextFieldUi from "../ui/utils/TextFieldUi";

interface Props {
  children?: ReactNode;
}

export const ManageClinicCertifications: FC<Props> = ({}) => {
  const { clinics } = useContext(ClinicContext);
  const {
    certifications,
    createCertification,
    updateCertification,
    deleteCertification,
    getCertificationsByClinicId,
  } = useContext(CertificationContext);
  const { setProgress } = useContext(UIContext);
  const { enqueueSnackbar } = useSnackbar();
  const [index, setIndex] = useState(0);
  const [submit, setSubmit] = useState("CREATE");
  const [create, onCreate] = useState(true);
  const [clinic, setClinic] = useState({ name: "Clinic" } as Clinic);
  const [values, setValues] = useState(certification);
  const [inputs, setInputs] = useState({} as Certification);

  useEffect(() => {
    getCertificationsByClinicId(clinic?._id || "");
  }, [clinic, getCertificationsByClinicId]);

  const successService = async (state: string) => {
    await getCertificationsByClinicId(clinic?._id || "");
    setInputs({} as Certification);
    setValues(certification);
    setIndex(0);
    setClinic({ name: "Clinics" } as Clinic);
    onCreate(true);
    setSubmit("CREATE");
    setProgress(false);
    enqueueSnackbar(`Your certification has been ${state}!`, {
      variant: "success",
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submit === "SAVE" && certifications) {
      try {
        setProgress(true);
        await updateCertification(certifications[index]._id || "", {
          ...inputs,
        } as Certification).then(() => {
          successService("updated");
        });
      } catch (error: any) {
        setProgress(false);
        enqueueSnackbar("Error, try again!", { variant: "error" });
      }
    } else {
      try {
        setProgress(true);
        await createCertification({
          ...inputs,
          clinic_id: clinic._id,
        } as Certification).then(() => {
          successService("created");
        });
      } catch (error: any) {
        setProgress(false);
        enqueueSnackbar("Error, try again!", { variant: "error" });
      }
    }
    setProgress(false);
  };

  const SupressCertification = async () => {
    try {
      setProgress(true);
      await deleteCertification(certifications[index]?._id || "").then(
        async () => {
          await getCertificationsByClinicId(clinic?._id || "");
          successService("deleted");
        }
      );
    } catch (error) {
      setProgress(false);
      enqueueSnackbar("Error, try again!", { variant: "error" });
    }
    setProgress(false);
  };

  const handleInput = ({ target }: ChangeEvent<any>) => {
    setValues({ ...values, [target.name]: target.value });
    const value = target.type === "checkbox" ? target.checked : target.value;
    setInputs({ ...inputs, [target.name]: value });
  };

  return (
    <AccordionUi summary="Manage Clinic Certifications">
      <form onSubmit={handleSubmit} noValidate>
        <Grid container spacing={0} rowSpacing={2}>
          <Grid item xs={12}>
            {
              <Alert severity={create ? "success" : "info"}>
                {`${create ? "Create" : "Update"} a product`}
              </Alert>
            }
          </Grid>
          <Grid item xs={12}>
            <SelectUi>
              <MenuItem value={""}>{clinic.name}</MenuItem>
              {clinics.map((item, index) => (
                <MenuItem
                  key={index}
                  value={item.name || ""}
                  onClick={() => {
                    setClinic(item);
                  }}
                >
                  {item.name}
                </MenuItem>
              ))}
            </SelectUi>
          </Grid>
          <Grid item xs={12}>
            <SelectUi>
              <MenuItem
                value={""}
                onClick={() => {
                  setSubmit("CREATE");
                  onCreate(true);
                  setValues(certification);
                }}
              >
                Certifications
              </MenuItem>
              {certifications.map((item, index) => (
                <MenuItem
                  key={index}
                  value={item.name}
                  onClick={() => {
                    setSubmit("SAVE");
                    onCreate(false);
                    setValues(item);
                    setIndex(index);
                  }}
                >
                  {item.name}
                </MenuItem>
              ))}
            </SelectUi>
          </Grid>
          <TextFieldUi
            submit="required"
            type="text"
            name="name"
            label="Certification name"
            value={values.name}
            onChange={handleInput}
          />
          <TextFieldUi
            submit="required"
            type="text"
            name="description"
            label="Certification detailed description"
            value={values.description}
            onChange={handleInput}
          />
          <TextFieldUi
            submit="required"
            type="text"
            name="logo_link"
            label="Add image link"
            value={values.logo_link}
            onChange={handleInput}
          />
          <Grid item xs={12}>
            <ManageButtons
              suppress={SupressCertification}
              create={create}
              submit={submit}
              type="certification"
            />
          </Grid>
        </Grid>
      </form>
    </AccordionUi>
  );
};

export default ManageClinicCertifications;
