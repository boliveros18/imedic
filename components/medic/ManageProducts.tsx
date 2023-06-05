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
import {
  Alert,
  Grid,
  MenuItem,
  Typography,
  InputAdornment,
} from "@mui/material";
import { UIContext } from "../../context/ui";
import { ProductContext } from "../../context/product";
import { ClinicContext } from "../../context/clinic";
import { Product, Medic, Clinic } from "../../interfaces";
import { SelectUi } from "../ui/utils/SelectUi";
import { useSnackbar } from "notistack";
import { Category, Procedure } from "../../utils/medic-category/lib";
import { product } from "../../utils/constants";
import ManageButtons from "../ui/utils/ManageButtons";
import TextFieldUi from "../ui/utils/TextFieldUi";

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
  const [create, onCreate] = useState(true);
  const [clinic, setClinic] = useState({ name: "Clinic" } as Clinic);
  const [category, setCategory] = useState("Category");
  const [procedure, setProcedure] = useState("Procedure");
  const [values, setValues] = useState(product);
  const [inputs, setInputs] = useState({} as Product);

  useEffect(() => {
    getProductsByMedicId(medic._id);
  }, [medic, getProductsByMedicId]);



  const successService = async (state: string) => {
    await getProductsByMedicId(medic._id);
    setInputs({} as Product);
    setValues(product);
    setIndex(0);
    setCategory("Category");
    setProcedure("Procedure");
    setClinic({ name: "Clinics" } as Clinic);
    onCreate(true);
    setSubmit("CREATE");
    setProgress(false);
    enqueueSnackbar(`Your product has been ${state}!`, {
      variant: "success",
    });
  };

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
          successService("updated")
        });
      } catch (error: any) {
        setProgress(false);
        enqueueSnackbar("Error, try again!", { variant: "error" });
   
      }
    } else {
      try {
        setProgress(true);
        await createProduct({
          ...inputs,
          medic_id: medic._id,
          clinic_id: clinic._id,
          category: category,
          procedure: procedure,
        } as Product).then(() => {
        successService("created")
        });
      } catch (error: any) {
        setProgress(false);
        enqueueSnackbar("Error, try again!", { variant: "error" });
   
      }
    }
    setProgress(false);
  };

  const SupressProduct = async () => {
    try {
      setProgress(true);
      await deleteProduct(products[index]?._id || "").then(async () => {
        // TODO: delete quotes in backend
        successService("deleted")
      });
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
    <AccordionUi summary="Manage Products">
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
                  setInputs({} as Product);
                  setValues(product);
                  setIndex(0);
                  setCategory("Category");
                  setProcedure("Procedure");
                  setClinic({ name: "Clinics" } as Clinic);
                  onCreate(true);
                  setSubmit("CREATE");
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
                    setClinic(
                      clinics.filter(
                        (clinic) => clinic._id === item.clinic_id
                      )[0]
                    );
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
          <TextFieldUi
            submit="required"
            type="number"
            name="recovery_days"
            label="Recovery days"
            value={values.recovery_days}
            onChange={handleInput}
          />
          <TextFieldUi
            submit="required"
            type="number"
            name="procedure_hours"
            label="Procedure hours"
            value={values.procedure_hours}
            onChange={handleInput}
          />
          <TextFieldUi
            submit="SAVE"
            type="number"
            name="surgical_facility"
            label="Surgical facility price per day"
            InputProps={{
              endAdornment: <InputAdornment position="end">US$</InputAdornment>,
            }}
            value={values.surgical_facility}
            onChange={handleInput}
          />
          <TextFieldUi
            submit="SAVE"
            type="number"
            name="facility_care"
            label="Facility care price per day"
            InputProps={{
              endAdornment: <InputAdornment position="end">US$</InputAdornment>,
            }}
            value={values.facility_care}
            onChange={handleInput}
          />
          <TextFieldUi
            submit="SAVE"
            type="number"
            name="medical_care"
            label="Medical care price per day"
            InputProps={{
              endAdornment: <InputAdornment position="end">US$</InputAdornment>,
            }}
            value={values.medical_care}
            onChange={handleInput}
          />
          <TextFieldUi
            submit="SAVE"
            type="number"
            name="anesthesia_fees"
            label="Anesthesia fees"
            InputProps={{
              endAdornment: <InputAdornment position="end">US$</InputAdornment>,
            }}
            value={values.anesthesia_fees}
            onChange={handleInput}
          />
          <TextFieldUi
            submit="SAVE"
            type="number"
            name="medical_tests"
            label="Medical tests price"
            InputProps={{
              endAdornment: <InputAdornment position="end">US$</InputAdornment>,
            }}
            value={values.medical_tests}
            onChange={handleInput}
          />
          <TextFieldUi
            submit="SAVE"
            type="number"
            name="post_surgery_garments"
            label="Post surgery garments price"
            InputProps={{
              endAdornment: <InputAdornment position="end">US$</InputAdornment>,
            }}
            value={values.post_surgery_garments}
            onChange={handleInput}
          />
          <TextFieldUi
            submit="SAVE"
            type="number"
            name="prescription_medication"
            label="Prescription medication price"
            InputProps={{
              endAdornment: <InputAdornment position="end">US$</InputAdornment>,
            }}
            value={values.prescription_medication}
            onChange={handleInput}
          />
          <TextFieldUi
            submit="SAVE"
            type="number"
            name="surgeon_fee"
            label="Surgeon fee"
            InputProps={{
              endAdornment: <InputAdornment position="end">US$</InputAdornment>,
            }}
            value={values.surgeon_fee}
            onChange={handleInput}
          />
          <TextFieldUi
            submit="SAVE"
            type="number"
            name="surgeon_insurance"
            label="Surgeon insurance price"
            InputProps={{
              endAdornment: <InputAdornment position="end">US$</InputAdornment>,
            }}
            value={values.surgeon_insurance}
            onChange={handleInput}
          />
          <TextFieldUi
            submit="SAVE"
            type="number"
            name="additional_cost"
            label="Additional cost"
            InputProps={{
              endAdornment: <InputAdornment position="end">US$</InputAdornment>,
            }}
            value={values.additional_cost}
            onChange={handleInput}
          />
          <TextFieldUi
            submit="SAVE"
            type="text"
            name="additional_cost_description"
            label="Additional cost description"
            value={values.additional_cost_description}
            onChange={handleInput}
          />
          <Grid item xs={12}>
            <Typography
              sx={{ fontSize: 13, fontWeight: "400", mt: -2 }}
              align="right"
            >
              *Be careful and detailed about the information of the addional
              cost of some supplementary procedures.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <ManageButtons
              suppress={SupressProduct}
              create={create}
              submit={submit}
              type="product"
            />
          </Grid>
        </Grid>
      </form>
    </AccordionUi>
  );
};

export default ManageProducts;
