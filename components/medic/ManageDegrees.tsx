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
import { Alert, Grid, MenuItem, Typography } from "@mui/material";
import { UIContext } from "../../context/ui";
import { DegreeContext } from "../../context/degree";
import { Degree, Medic } from "../../interfaces";
import { SelectUi } from "../ui/utils/SelectUi";
import { useSnackbar } from "notistack";
import { AcademicDegrees } from "../../utils/category";
import { capitalize } from "../../utils/strings";
import { FileContext } from "../../context/file";
import { degree } from "../../utils/constants";
import AddDocumentMedicProfile from "./AddDocumentMedicProfile";
import ManageButtons from "../ui/utils/ManageButtons";
import TextFieldUi from "../ui/utils/TextFieldUi";
import { isFilledInputsForm } from "../../utils/validations";

interface Props {
  children?: ReactNode;
  medic: Medic;
}

export const ManageDegrees: FC<Props> = ({ medic }) => {
  const { enqueueSnackbar } = useSnackbar();
  const {
    degrees,
    createDegree,
    updateDegree,
    deleteDegree,
    getDegreesByMedicId,
  } = useContext(DegreeContext);
  const { setProgress } = useContext(UIContext);
  const [level, setLevel] = useState("Level degree");
  const { file } = useContext(FileContext);
  const [index, setIndex] = useState(0);
  const [submit, setSubmit] = useState("CREATE");
  const [create, onCreate] = useState(true);
  const [values, setValues] = useState(degree);

  useEffect(() => {
    getDegreesByMedicId(medic._id);
  }, [medic, getDegreesByMedicId]);

  const successService = async (state: string) => {
    await getDegreesByMedicId(medic._id);

    setValues(degree);
    setIndex(0);
    setLevel("Level degree");
    onCreate(true);
    setSubmit("CREATE");
    setProgress(false);
    enqueueSnackbar(`Your degree has been ${state}!`, {
      variant: "success",
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submit === "SAVE" && degrees) {
      try {
        setProgress(true);
        await updateDegree(degrees[index]._id || "", {
          ...values,
          file_id: file?._id,
          level: level,
        } as Degree).then(() => {
          successService("updated");
        });
      } catch (error: any) {
        setProgress(false);
        enqueueSnackbar(`${error}`, { variant: "error" });
      }
    } else {
      try {
        setProgress(true);
        const filledInputsForm = isFilledInputsForm(
          {
            medic_id: medic._id,
            name: values.name,
            university: values.university,
            level: level,
            file_id: file._id,
          } as Degree,
          degree
        );
        await createDegree(filledInputsForm).then(() => {
          successService("created");
        });
      } catch (error: any) {
        setProgress(false);
        enqueueSnackbar(`${error}`, { variant: "error" });
      }
    }
    setProgress(false);
  };

  const SupressDegree = async () => {
    try {
      setProgress(true);
      await deleteDegree(degrees[index]?._id || "").then(() => {
        successService("deleted");
      });
    } catch (error) {
      setProgress(false);
      enqueueSnackbar(`${error}`, { variant: "error" });
    }
    onCreate(true);
    setProgress(false);
  };

  const handleInput = ({ target }: ChangeEvent<any>) => {
    setValues({ ...values, [target.name]: target.value });
  };

  return (
    <AccordionUi summary="Manage Degrees">
      <form onSubmit={handleSubmit} noValidate>
        <Grid container spacing={0} rowSpacing={2}>
          <Grid item xs={12}>
            {
              <Alert severity={create ? "success" : "info"}>
                {`${create ? "Create" : "Update"} a degree`}
              </Alert>
            }
          </Grid>
          <Grid item xs={12}>
            <SelectUi>
              <MenuItem
                value={""}
                onClick={() => {
                  setValues(degree);
                  setIndex(0);
                  setLevel("Level degree");
                  onCreate(true);
                  setSubmit("CREATE");
                }}
              >
                Degrees
              </MenuItem>
              {degrees?.map((item, index) => (
                <MenuItem
                  key={index}
                  value={item.name}
                  onClick={() => {
                    setValues(item);
                    setIndex(index);
                    setLevel(item.level);
                    setSubmit("SAVE");
                    onCreate(false);
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
            label="Professional degree name"
            value={capitalize(values.name)}
            onChange={handleInput}
          />
          <TextFieldUi
            type="text"
            submit={submit}
            name="university"
            label={
              submit === "SAVE"
                ? "University"
                : "University example: University of Miami"
            }
            value={capitalize(values.university)}
            onChange={handleInput}
          />
          <Grid item xs={12}>
            <SelectUi>
              <MenuItem value={""}>{level}</MenuItem>
              {AcademicDegrees.map((item, index) => (
                <MenuItem
                  key={index}
                  value={item}
                  onClick={() => setLevel(item)}
                >
                  {item}
                </MenuItem>
              ))}
            </SelectUi>
          </Grid>
          <Grid item xs={12} sx={{ mt: -1 }}>
            {level !== "Level degree" ? (
              <>
                <AddDocumentMedicProfile
                  handleSubmit={handleSubmit}
                  medic={medic}
                  type={level}
                  text={`Apostille ${level} diploma PDF: `}
                />{" "}

                  <Typography
                    sx={{ fontSize: 13, fontWeight: "400" }}
                    align="right"
                  >
                    *You must save or create after file has uploaded.
                  </Typography>
             
              </>
            ) : null}
          </Grid>               
          <Grid item xs={12}>
            <ManageButtons
              suppress={SupressDegree}
              create={create}
              submit={submit}
              type="degree"
            />
          </Grid>
        </Grid>
      </form>
    </AccordionUi>
  );
};

export default ManageDegrees;
