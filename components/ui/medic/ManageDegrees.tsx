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
  Button,
  MenuItem,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import { UIContext } from "../../../context/ui";
import { DegreeContext } from "../../../context/degree";
import { Degree, Medic } from "../../../interfaces";
import { SelectUi } from "../utils/SelectUi";
import { useSnackbar } from "notistack";
import { AcademicDegrees } from "../../../utils/category";
import { capitalize } from "../../../utils/strings";
import { FileContext } from "../../../context/file";
import AddDocumentMedicProfile from "./AddDocumentMedicProfile";

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
  const [type, setType] = useState("Academic degree");
  const { file } = useContext(FileContext);
  const [index, setIndex] = useState(0);
  const [submit, setSubmit] = useState("CREATE");
  const [open, setOpen] = useState(false);
  const [create, onCreate] = useState(true);

  const degree = {
    name: "",
    university: "",
  } as Degree;
  const [values, setValues] = useState(degree);
  const [inputs, setInputs] = useState({} as Degree);

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
    getDegreesByMedicId(medic._id);
  }, [medic, getDegreesByMedicId]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submit === "SAVE" && degrees) {
      try {
        setProgress(true);
        await updateDegree(degrees[index]._id || "", {
          ...inputs,
          file_id: file._id,
          to_approve: file._id ? true : false,
        } as Degree).then(() => {
          setInputs({} as Degree);
          getDegreesByMedicId(medic._id);
          success("degree", "updated");
        });
      } catch (error: any) {
        unsuccess(error);
      }
    } else {
      try {
        setProgress(true);
        await createDegree({
          ...inputs,
          name: capitalize(inputs.name),
          medic_id: medic._id,
          file_id: file._id,
          to_approve: file._id ? true : false,
        } as Degree).then(() => {
          getDegreesByMedicId(medic._id);
          setValues(degree);
          success("degree", "created");
        });
      } catch (error: any) {
        unsuccess(error);
      }
    }
  };

  const SupressDegree = async () => {
    try {
      setProgress(true);
      await deleteDegree(degrees[index]?._id || "").then(async () => {
        await getDegreesByMedicId(medic._id);
        setSubmit("CREATE");
        setValues(degree);
        setInputs({} as Degree);
        setIndex(0);
        success("degree", "deleted");
      });
    } catch (error) {
      unsuccess(error);
    }
    onCreate(true);
  };

  const handleInput = ({ target }: ChangeEvent<any>) => {
    setValues({ ...values, [target.name]: target.value });
    const value = target.type === "checkbox" ? target.checked : target.value;
    setInputs({ ...inputs, [target.name]: value });
  };

  return (
    <AccordionUi summary="Manage degrees">
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
                  setSubmit("CREATE");
                  onCreate(true);
                  setValues(degree);
                  setInputs({} as Degree);
                  setType("Academic degree")
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
                    setInputs({} as Degree);
                    setSubmit("SAVE");
                    onCreate(false);
                    index === 0 ? setType("pregrade") : setType("postgrade")
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
              label="Professional degree name"
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
              name="university"
              label={
                submit === "SAVE"
                  ? "University"
                  : "University example: University of Miami"
              }
              variant="outlined"
              fullWidth
              autoComplete="off"
              value={values.university}
              onChange={handleInput}
              size="small"
              error={!values.university}
            />
          </Grid>
          <Grid item xs={12}>
            <SelectUi>
              <MenuItem value={""}>{type}</MenuItem>
              {AcademicDegrees.map((item, index) => (
                <MenuItem
                  key={index}
                  value={item}
                  onClick={() => setType(item)}
                >
                  {item}
                </MenuItem>
              ))}
            </SelectUi>
          </Grid>
          <Grid item xs={12} sx={{ mt: -1 }}>
            <AddDocumentMedicProfile
              type={type}
              text={`Add PDF apostille ${type} diploma`}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={0} rowSpacing={2}>
              <Grid item xs={3} display="flex" justifyContent="center">
                <Button
                  type="button"
                  disabled={create}
                  variant="outlined"
                  size="medium"
                  sx={{
                    width: "90%",
                    color: "white",
                    backgroundColor: "#ff5757",
                    borderColor: "#ff5757",
                  }}
                  onClick={handleClickOpen}
                >
                  delete
                </Button>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Do you want to delete this clinic?"}
                  </DialogTitle>
                  <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button
                      onClick={() => {
                        handleClose();
                        SupressDegree();
                      }}
                      autoFocus
                    >
                      Yes
                    </Button>
                  </DialogActions>
                </Dialog>
              </Grid>
              <Grid item xs={9} display="flex" justifyContent="center">
                <Button
                  type="submit"
                  variant="outlined"
                  size="medium"
                  sx={{
                    width: "100%",
                    color: "black",
                    backgroundColor:
                      submit === "SAVE" ? "ligthgray" : "primary",
                  }}
                >
                  {submit}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </AccordionUi>
  );
};

export default ManageDegrees;
