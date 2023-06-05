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
import { Product, Quote } from "../../interfaces";
import { SelectUi } from "../ui/utils/SelectUi";
import { quote } from "../../utils/constants";
import { useSnackbar } from "notistack";
import ManageButtons from "../ui/utils//ManageButtons";
import TextFieldUi from "../ui/utils//TextFieldUi";

interface Props {
  children?: ReactNode;
}

export const ProductQuotes: FC<Props> = ({}) => {
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
  const [product, setProduct] = useState({ procedure: "Procedure" } as Product);
  const [index, setIndex] = useState(0);
  const [submit, setSubmit] = useState("CREATE");
  const [create, onCreate] = useState(true);
  const [unit, setUnit] = useState("Select unit");
  const units = ["lb", "oz", "in", "sq.in", "ft", "cc", "unit"];

  useEffect(() => {
    getQuotesByProductId(product._id);
  }, [product, getQuotesByProductId]);

  const [values, setValues] = useState(quote);
  const [inputs, setInputs] = useState({} as Quote);

  const successService = async (state: string) => {
    await getQuotesByProductId(product._id);
    setInputs({} as Quote);
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
          ...inputs,
          unit: unit,
        } as Quote).then(() => {
          successService("updated");
        });
      } catch (error: any) {
        setProgress(false);
        enqueueSnackbar("Error, try again!", { variant: "error" });
      }
    } else {
      try {
        setProgress(true);
        await createQuote({
          ...inputs,
          product_id: product._id,
          unit: unit,
          currency: "US",
        } as Quote).then(() => {
          successService("created");
        });
      } catch (error: any) {
        setProgress(false);
        enqueueSnackbar("Error, try again!", { variant: "error" });
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
    <AccordionUi summary="Products Quotations">
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
              label="Quantities"
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
