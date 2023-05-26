import {
  FC,
  ReactNode,
  useContext,
  useState,
  ChangeEvent,
  FormEvent,
  useEffect
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
  InputAdornment,
} from "@mui/material";
import { UIContext } from "../../../context/ui";
import { ProductContext } from "../../../context/product";
import { ClinicContext } from "../../../context/clinic";
import { Product, Medic, Clinic } from "../../../interfaces";
import { SelectUi } from "../utils/SelectUi";
import { useSnackbar } from "notistack";
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
  const { clinics } = useContext(ClinicContext);
  const { setProgress } = useContext(UIContext);
  const [index, setIndex] = useState(0);
  const [submit, setSubmit] = useState("CREATE");
  const [open, setOpen] = useState(false);
  const [create, onCreate] = useState(true);
  const [clinic, setClinic] = useState({ name: "Clinic" } as Clinic);
  const [category, setCategory] = useState("Category");
  const [procedure, setProcedure] = useState("Procedure");

  useEffect(() => {
    getProductsByMedicId(medic._id)
  }, [medic, getProductsByMedicId])
  
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(1)
    if (submit === "SAVE" && products) {
      console.log(2)
      try {
        console.log(3)
        setProgress(true);
        await updateProduct(products[index]._id || "", {
          ...inputs,
          category: category,
          procedure: procedure,
        } as Product).then(() => {
          console.log(4)
          setInputs({} as Product);
          getProductsByMedicId(medic._id);
          console.log(5)
          success("product", "updated");
        });
      } catch (error: any) {
        unsuccess(error);
      }
    } else {
      console.log(6)
      try {
        setProgress(true);
        console.log(7)
        await createProduct({
          ...inputs,
          medic_id: medic._id,
          clinic_id: clinic._id,
          category: category,
          procedure: procedure,
        } as Product).then(() => {
          console.log(8)
          getProductsByMedicId(medic._id);
          console.log(9)
          setValues(product);
          setCategory("Category");
          setProcedure("Procedure");
          setClinic({ name:"Clinics"} as Clinic);
          success("product", "created");
        });
      } catch (error: any) {
        unsuccess(error);
      }
    }
    setProgress(false);
    console.log(10)
  };

  const SupressDegree = async () => {
    try {
      setProgress(true);
      await deleteProduct(products[index]?._id || "").then(async () => {
        // TODO: delete quotes in backend
        await getProductsByMedicId(medic._id);
        setSubmit("CREATE");
        setValues(product);
        setInputs({} as Product);
        setIndex(0);
        setCategory("Category");
        setProcedure("Procedure");
        setClinic({ name:"Clinics"} as Clinic);
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
                  setCategory("Category");
                  setProcedure("Procedure");
                  setClinic({ name:"Clinics"} as Clinic);
                }}
              >
                Products
              </MenuItem>
              {products.map((item, index) => (
                <MenuItem
                  key={index}
                  value={item.procedure}
                  onClick={() => {
                    setValues(item);
                    setIndex(index);
                    setInputs({} as Product);
                    setSubmit("SAVE");
                    onCreate(false);
                    setCategory(item.category);
                    setProcedure(item.procedure);
                    setClinic(clinics.filter((clinic) => clinic._id === item.clinic_id)[0]);
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
            <SelectUi>
              <MenuItem value={""}>{clinic.name}</MenuItem>
              {clinics.map((item, index) => (
                <MenuItem
                  key={index}
                  value={item.name || ""}
                  onClick={() => setClinic(item)}
                >
                  {item.name}
                </MenuItem>
              ))}
            </SelectUi>
          </Grid>
          <Grid item xs={12}>
            <TextField
              InputLabelProps={{ shrink: true }}
              required
              type="number"
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
              required
              type="number"
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
            <TextField
              InputLabelProps={{ shrink: true }}
              type="number"
              name="surgical_facility"
              label="Surgical facility price per day"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">US$</InputAdornment>
                ),
              }}
              fullWidth
              autoComplete="off"
              value={values.surgical_facility}
              onChange={handleInput}
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              InputLabelProps={{ shrink: true }}
              type="number"
              name="facility_care"
              label="Facility care price per day"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">US$</InputAdornment>
                ),
              }}
              fullWidth
              autoComplete="off"
              value={values.facility_care}
              onChange={handleInput}
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              InputLabelProps={{ shrink: true }}
              type="number"
              name="medical_care"
              label="Medical care price per day"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">US$</InputAdornment>
                ),
              }}
              fullWidth
              autoComplete="off"
              value={values.medical_care}
              onChange={handleInput}
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              InputLabelProps={{ shrink: true }}
              type="number"
              name="anesthesia_fees"
              label="Anesthesia fees"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">US$</InputAdornment>
                ),
              }}
              fullWidth
              autoComplete="off"
              value={values.anesthesia_fees}
              onChange={handleInput}
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              InputLabelProps={{ shrink: true }}
              type="number"
              name="medical_tests"
              label="Medical tests price"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">US$</InputAdornment>
                ),
              }}
              fullWidth
              autoComplete="off"
              value={values.medical_tests}
              onChange={handleInput}
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              InputLabelProps={{ shrink: true }}
              type="number"
              name="post_surgery_garments"
              label="Post surgery garments price"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">US$</InputAdornment>
                ),
              }}
              fullWidth
              autoComplete="off"
              value={values.post_surgery_garments}
              onChange={handleInput}
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              InputLabelProps={{ shrink: true }}
              type="number"
              name="prescription_medication"
              label="Prescription medication price"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">US$</InputAdornment>
                ),
              }}
              fullWidth
              autoComplete="off"
              value={values.prescription_medication}
              onChange={handleInput}
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              InputLabelProps={{ shrink: true }}
              type="number"
              name="surgeon_fee"
              label="Surgeon fee"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">US$</InputAdornment>
                ),
              }}
              fullWidth
              autoComplete="off"
              value={values.surgeon_fee}
              onChange={handleInput}
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              InputLabelProps={{ shrink: true }}
              type="number"
              name="surgeon_insurance"
              label="Surgeon insurance price"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">US$</InputAdornment>
                ),
              }}
              fullWidth
              autoComplete="off"
              value={values.surgeon_insurance}
              onChange={handleInput}
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              InputLabelProps={{ shrink: true }}
              type="number"
              name="additional_cost"
              label="Additional cost"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">US$</InputAdornment>
                ),
              }}
              fullWidth
              autoComplete="off"
              value={values.additional_cost}
              onChange={handleInput}
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              InputLabelProps={{ shrink: true }}
              type="text"
              name="additional_cost_description"
              label="Additional cost description"
              variant="outlined"
              fullWidth
              autoComplete="off"
              value={values.additional_cost_description}
              onChange={handleInput}
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              sx={{ fontSize: 13, fontWeight: "400", mt: -2 }}
              align="right"
            >
              *Be careful and detailed about the information of the addional
              cost of some additional procedures.
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
                    {"Do you want to delete this product?"}
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
