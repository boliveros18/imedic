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
import { QuoteContext } from "../../context/quote";
import { Medic, Product, Quote } from "../../interfaces";
import { SelectUi } from "../ui/utils/SelectUi";
import { quote, units } from "../../utils/constants";
import { useSnackbar } from "notistack";
import ManageButtons from "../ui/utils//ManageButtons";
import TextFieldUi from "../ui/utils//TextFieldUi";
import { isFilledInputsForm } from "../../utils/validations";

interface Props {
  children?: ReactNode;
  medic: Medic;
}

export const ProductQuotes: FC<Props> = ({ medic }) => {
  const { products } = useContext(ProductContext);
  const {
    quotes,
    updateQuote,
    createQuote,
    deleteQuote,
    getQuotesByProductId,
  } = useContext(QuoteContext);
  const { setProgress } = useContext(UIContext);
  const { enqueueSnackbar } = useSnackbar();
  const [product, setProduct] = useState({ procedure: "Product", _id: "" } as Product);
  const [index, setIndex] = useState(0);
  const [submit, setSubmit] = useState("CREATE");
  const [create, onCreate] = useState(true);
  const [unit, setUnit] = useState("Select unit");
  const [values, setValues] = useState(quote);

  useEffect(() => {
    getQuotesByProductId(product._id);
  }, [product, getQuotesByProductId]);

  const successService = async (state: string) => {
    await getQuotesByProductId(product._id);
    setValues(quote);
    setIndex(0);
    setUnit("Select unit");
    onCreate(true);
    setSubmit("CREATE");
    setProgress(false);
    enqueueSnackbar(`Your quote has been ${state}!`, {
      variant: "success",
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submit === "SAVE" && quotes) {
      try {
        setProgress(true);
        await updateQuote(quotes[index]._id || "", {
          ...values,
          unit: unit,
        } as Quote).then(() => {
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
          medic_id:  medic._id,
          product_id: product._id,
          quantity: values.quantity,
          price: values.price,
          unit: unit,
          currency: "US",
        } as Quote, quote);
        await createQuote(filledInputsForm).then(() => {
          successService("created");
        });
      } catch (error: any) {
        setProgress(false);
        enqueueSnackbar(`${error}`, { variant: "error" });
      }
    }
    setProgress(false);
  };

  const SupressQuote = async () => {
    try {
      setProgress(true);
      await deleteQuote(quotes[index]?._id || "").then(() => {
        successService("deleted");
      });
    } catch (error: any) {
      setProgress(false);
      enqueueSnackbar(`${error}`, { variant: "error" });
    }
    setProgress(false);
  };

  const handleInput = ({ target }: ChangeEvent<any>) => {
    setValues({ ...values, [target.name]: target.value });
  };

  return (
    <AccordionUi summary="Products Quotations">
      <form onSubmit={handleSubmit} noValidate>
        <Grid container spacing={0} rowSpacing={2}>
          <Grid item xs={12}>
            {
              <Alert severity={create ? "success" : "info"}>
                {`${create ? "Create" : "Update"} a product quote`}
              </Alert>
            }
          </Grid>
          <Grid item xs={12}>
            <SelectUi>
              <MenuItem value={""}>{product.procedure}</MenuItem>
              {products.map((item, index) => (
                <MenuItem
                  key={index}
                  value={item.procedure}
                  onClick={() => {
                    setProduct(item);
                  }}
                >
                  <span style={{ fontWeight: "500" }}>{item.procedure}</span>
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
                  setValues(quote);
                  setUnit("Select unit");
                }}
              >
                quotes
              </MenuItem>
              {quotes.map((item, index) => (
                <MenuItem
                  key={index}
                  value={
                    product.procedure + " - " + item.quantity + " " + item.unit
                  }
                  onClick={() => {
                    setSubmit("SAVE");
                    onCreate(false);
                    setValues(item);
                    setUnit(item.unit);
                    setIndex(index);
                  }}
                >
                  {product.procedure + " - " + item.quantity + " " + item.unit}
                </MenuItem>
              ))}
            </SelectUi>
          </Grid>
          <Grid item xs={12}>
            <TextFieldUi
              submit="required"
              type="number"
              name="quantity"
              label="Quantities example: 100 cc"
              value={values.quantity}
              onChange={handleInput}
            />
          </Grid>
          <Grid item xs={12}>
            <SelectUi>
              <MenuItem value={""}>{unit}</MenuItem>
              {units.map((item, index) => (
                <MenuItem
                  key={index}
                  value={item}
                  onClick={() => setUnit(item)}
                >
                  {item}
                </MenuItem>
              ))}
            </SelectUi>
          </Grid>
          <Grid item xs={12}>
            <TextFieldUi
              submit="required"
              type="number"
              name="price"
              label="product price"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">US$</InputAdornment>
                ),
              }}
              value={values.price}
              onChange={handleInput}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              sx={{ fontSize: 13, fontWeight: "400", mt: -2 }}
              align="right"
            >
              *Add a new quote for each different quantity in your product.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <ManageButtons
              suppress={SupressQuote}
              create={create}
              submit={submit}
              type="quote"
            />
          </Grid>
        </Grid>
      </form>
    </AccordionUi>
  );
};

export default ProductQuotes;
