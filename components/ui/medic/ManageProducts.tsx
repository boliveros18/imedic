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
  Typography,
} from "@mui/material";
import { UIContext } from "../../../context/ui";
import { ProductContext } from "../../../context/product";
import { ClinicContext } from "../../../context/clinic";
import { Product, Medic, Clinic, IProcedures } from "../../../interfaces";
import { SelectUi } from "../utils/SelectUi";
import { useSnackbar } from "notistack";
import { capitalize } from "../../../utils/strings";
import { Category, Procedure } from "../../../utils/medic-category/lib";

interface Props {
  children?: ReactNode;
  medic: Medic;
}

export const ManageProducts: FC<Props> = ({ medic }) => {
  const { enqueueSnackbar } = useSnackbar();
  const {
    products,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductsByMedicId,
  } = useContext(ProductContext);
  const { clinics, getClinicsByMedicId } = useContext(ClinicContext);
  const { setProgress } = useContext(UIContext);
  const [index, setIndex] = useState(0);
  const [submit, setSubmit] = useState("CREATE");
  const [open, setOpen] = useState(false);
  const [create, onCreate] = useState(true);
  const [clinic, setClinic] = useState({} as Clinic);
  const [category, setCategory] = useState("Category");
  const [procedure, setProcedure] = useState("Procedure");

  const product = {
    category: "Category",
    procedure: "Procedure",
    recovery_days: 0,
    procedure_hours: 0,
    surgical_facility: 0,
    facility_care: 0,
    medical_care: 0,
    anesthesia_fees: 0,
    medical_tests: 0,
    post_surgery_garments: 0,
    prescription_medication: 0,
    surgeon_fee: 0,
    surgeon_insurance: 0,
    additional_cost: 0,
    additional_cost_description: "",
    currency: "US",
  } as Product;
  const [values, setValues] = useState(product);
  const [inputs, setInputs] = useState({} as Product);

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
    getProductsByMedicId(medic._id);
    getClinicsByMedicId(medic._id);
  }, [medic, getProductsByMedicId, getClinicsByMedicId]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submit === "SAVE" && products) {
      try {
        setProgress(true);
        await updateProduct(products[index]._id || "", {
          ...inputs,
          category: category,
          procedure: procedure,
        } as Product).then(() => {
          setInputs({} as Product);
          getProductsByMedicId(medic._id);
          success("product", "updated");
        });
      } catch (error: any) {
        unsuccess(error);
      }
    } else {
      try {
        setProgress(true);
        await createProduct({
          ...inputs,
          medic_id: medic._id,
          // quote_id: quote._id, //TODO: create quote globals
          // clinic_id: clinic._id, //TODO: bring clinic quote globals
          category: category,
          procedure: procedure,
        } as Product).then(() => {
          getProductsByMedicId(medic._id);
          setValues(product);
          success("product", "created");
        });
      } catch (error: any) {
        unsuccess(error);
      }
    }
    setProgress(false);
  };

  const SupressDegree = async () => {
    try {
      setProgress(true);
      await deleteProduct(products[index]?._id || "").then(async () => {
        // await deleteQuote(products[index]?.quote_id);
        await getProductsByMedicId(medic._id);
        setSubmit("CREATE");
        setValues(product);
        setInputs({} as Product);
        setIndex(0);
        success("product", "deleted");
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
    <AccordionUi summary="Manage products">
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
              <MenuItem
                value={""}
                onClick={() => {
                  setSubmit("CREATE");
                  onCreate(true);
                  setValues(product);
                  setInputs({} as Product);
                }}
              >
                Products
              </MenuItem>
              {products?.map((item, index) => (
                <MenuItem
                  key={index}
                  value={item.procedure}
                  onClick={() => {
                    setValues(item);
                    setIndex(index);
                    setInputs({} as Product);
                    setSubmit("SAVE");
                    onCreate(false);
                  }}
                >
                  <span style={{ fontWeight: "500" }}>{item.procedure}</span>
                </MenuItem>
              ))}
            </SelectUi>
          </Grid>
          <Grid item xs={12}>
            <SelectUi>
              <MenuItem value={""}>{category}</MenuItem>
              {Category.getAllCategories().map((item, index) => (
                <MenuItem
                  key={index}
                  value={item.name || ""}
                  onClick={() => setCategory(item.name)}
                >
                  {item.name}
                </MenuItem>
              ))}
            </SelectUi>
          </Grid>
          <Grid item xs={12}>
            <SelectUi>
              <MenuItem value={""}>{procedure}</MenuItem>
              {Procedure.getProceduresOfCategory(category).map(
                (item, index) => (
                  <MenuItem
                    key={index}
                    value={item.name || ""}
                    onClick={() => setProcedure(item.name)}
                  >
                    {item.name}
                  </MenuItem>
                )
              )}
            </SelectUi>
          </Grid>
          <Grid item xs={12}>
            <TextField
              InputLabelProps={{ shrink: true }}
              required={submit === "SAVE" ? false : true}
              type="text"
              name="recovery_days"
              label="Recovery days"
              variant="outlined"
              fullWidth
              autoComplete="off"
              value={values.recovery_days}
              onChange={handleInput}
              size="small"
              error={!values.recovery_days}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              InputLabelProps={{ shrink: true }}
              required={submit === "SAVE" ? false : true}
              type="text"
              name="procedure_hours"
              label="Procedure hours"
              variant="outlined"
              fullWidth
              autoComplete="off"
              value={values.procedure_hours}
              onChange={handleInput}
              size="small"
              error={!values.procedure_hours}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              sx={{ fontSize: 13, fontWeight: "400", mt: -2 }}
              align="right"
            >
              *save updates after file upload
            </Typography>
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
                  <DialogTitle
                    id="alert-dialog-title"
                    sx={{ fontSize: 16, fontWeight: "500" }}
                  >
                    {"Do you want to delete this degree?"}
                  </DialogTitle>
                  <DialogActions>
                    <Button onClick={handleClose} sx={{ fontSize: 14 }}>
                      No
                    </Button>
                    <Button
                      onClick={() => {
                        handleClose();
                        SupressDegree();
                      }}
                      autoFocus
                      sx={{ fontSize: 14 }}
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

export default ManageProducts;
