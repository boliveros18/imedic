import { FC, ReactNode, useState, useEffect, useContext } from "react";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { Product } from "../../../interfaces";
import { ProductContext } from "../../../context/product";

interface Props {
  children?: ReactNode;
  products: Product[];
}

export const SelectCategoryAndProcedure: FC<Props> = ({ products }) => {
  const [procedure, setProcedure] = useState("");
  const { setIndex } = useContext(ProductContext);
  const handleChange = (event: SelectChangeEvent) => {
    setProcedure(event.target.value as string);
  };

  useEffect(() => {
    if (products.length > 0) {
      setProcedure(products[0].procedure);
    }
  }, [setProcedure, products]);

  return (
    <Select
      size="small"
      sx={{
        minWidth: 65,
        boxShadow: "none",
        ".MuiOutlinedInput-notchedOutline": { border: "none" },
        backgroundColor: "white",
      }}
      value={procedure}
      displayEmpty
      inputProps={{ "aria-label": "Without label" }}
      onChange={handleChange}
    >
      {products.length > 0 ? (
        products.map((item, index) => (
          <MenuItem
            key={index}
            value={item.procedure}
            onClick={() => setIndex(index)}
          >
            <span style={{ fontWeight: "500" }}>{item.category + " | "}</span>
            <span>{item.procedure}</span>
          </MenuItem>
        ))
      ) : (
        <MenuItem value={""}>
          <span style={{ fontWeight: "500" }}>Add </span> | Procedure below
        </MenuItem>
      )}
    </Select>
  );
};

export default SelectCategoryAndProcedure;
