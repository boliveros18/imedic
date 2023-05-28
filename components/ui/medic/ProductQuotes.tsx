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
  Typography,
  InputAdornment,
} from "@mui/material";
import { UIContext } from "../../../context/ui";
import { ProductContext } from "../../../context/product";
import { QuoteContext } from "../../../context/quote";
import { Product, Quote } from "../../../interfaces";
import { SelectUi } from "../utils/SelectUi";
import { useSnackbar } from "notistack";
import ManageButtons from "../utils/ManageButtons";

interface Props {
  children?: ReactNode;
}

export const ProductQuotes: FC<Props> = ({}) => {
  const { enqueueSnackbar } = useSnackbar();
  const { products } = useContext(ProductContext);
  const {
    quotes,
    updateQuote,
    createQuote,
    deleteQuote,
    getQuotesByProductId,
  } = useContext(QuoteContext);
  const { setProgress } = useContext(UIContext);
  const [product, setProduct] = useState({ procedure: "Procedure" } as Product);
  const [index, setIndex] = useState(0);
  const [submit, setSubmit] = useState("CREATE");
  const [create, onCreate] = useState(true);
  const [unit, setUnit] = useState("Select unit");
  const units = ["lb", "oz", "in", "sq.in", "ft", "cc", "unit"];

  useEffect(() => {
    getQuotesByProductId(product._id);
  }, [product, getQuotesByProductId]);

  const quote = {
    price: 0,
    quantity: 0,
    unit: "cc",
    currency: "US",
  } as Quote;
  const [values, setValues] = useState(quote);
  const [inputs, setInputs] = useState({} as Quote);

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
    if (submit === "SAVE" && quotes) {
      try {
        setProgress(true);
        await updateQuote(quotes[index]._id || "", {
          ...inputs,
          unit: unit,
        } as Quote).then(() => {
          setInputs({} as Quote);
          setValues(quote)
          setUnit("Select unit");
          getQuotesByProductId(product._id);
          onCreate(true);
          success("quote", "updated");
        });
      } catch (error: any) {
        unsuccess(error);
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
          getQuotesByProductId(product._id);
          setInputs({} as Quote);
          setValues(quote);
          setUnit("Select unit");
          onCreate(true);
          success("quote", "created");
        });
      } catch (error: any) {
        unsuccess(error);
      }
    }
    setProgress(false);
  };

  const SupressQuote = async () => {
    try {
      setProgress(true);
      await deleteQuote(quotes[index]?._id || "").then(async () => {
        await getQuotesByProductId(product._id);
        onCreate(true);
        setSubmit("CREATE");
        setValues(quote);
        setInputs({} as Quote);
        setIndex(0);
        setUnit("Select unit");
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
    <AccordionUi summary="Products quotations">
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
                  onCreate(true);
                  setValues(quote)
                  setSubmit("CREATE");
                  setUnit("Select unit");
                }}
              >
                quotes
              </MenuItem>
              {quotes.map((item, index) => (
                <MenuItem
                  key={index}
                  value={product.procedure + " - " + item.quantity + " " + item.unit}
                  onClick={() => {
                    setIndex(index);
                    setValues(item);
                    setUnit(item.unit);
                    setSubmit("SAVE");
                    onCreate(false);
                  }}
                >
                  {product.procedure + " - " + item.quantity + " " + item.unit}
                </MenuItem>
              ))}
            </SelectUi>
          </Grid>
          <Grid item xs={12}>
            <TextField
              InputLabelProps={{ shrink: true }}
              required
              type="number"
              name="quantity"
              label="Quantities"
              variant="outlined"
              fullWidth
              autoComplete="off"
              value={values.quantity}
              onChange={handleInput}
              size="small"
              error={!values.quantity}
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
            <TextField
              InputLabelProps={{ shrink: true }}
              required
              type="number"
              name="price"
              label="product price"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">US$</InputAdornment>
                ),
              }}
              fullWidth
              autoComplete="off"
              value={values.price}
              onChange={handleInput}
              size="small"
              error={!values.price}
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
