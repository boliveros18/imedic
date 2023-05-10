import { FC, ReactNode, useReducer, useCallback } from "react";
import { ProductContext, productReducer } from ".";
import { Product } from "../../interfaces";
import { ProductService } from "../../services";
import { Pagination } from "./";

interface ProviderProps {
  children: ReactNode;
}

export interface State {
  index: number;
  products: Product[];
  product: Product;
}

const INITIAL_STATE: State = {
  index: 0,
  products: [],
  product: {} as Product,
};

export const ProductProvider: FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, INITIAL_STATE);

  const setIndex = (index: number) => {
    dispatch({ type: "SET_INDEX", payload: index });
    return index;
  };

  const getProduct = useCallback(async (id: string) => {
    const data = await ProductService.getProduct(id);
    dispatch({ type: "UPDATE_PRODUCT", payload: data });
    return data;
  }, []);

  const getProductsByMedicId = async (medic_id: string) => {
    const data = await ProductService.getProductsByMedicId(medic_id);
    dispatch({ type: "GET_PRODUCTS", payload: data[0] });
    return data;
  };

  const getProducts = async (pagination?: Pagination) => {
    const data = await ProductService.getProducts();
    dispatch({ type: "GET_PRODUCTS", payload: data });
    return data;
  };

  const createProduct = async (payload: Product) => {
    const data = await ProductService.createOne(payload);
    dispatch({ type: "UPDATE_PRODUCT", payload: data });
    return data;
  };

  const updateProduct = async (id: string, payload: Product) => {
    const data = await ProductService.updateOne(id, payload);
    dispatch({ type: "UPDATE_PRODUCT", payload: data });
    return data;
  };

  const deleteProduct = async (id: string) => {
    const data = await ProductService.deleteOne(id);
    dispatch({ type: "DELETE_PRODUCT", payload: data });
    return data;
  };
  return (
    <ProductContext.Provider
      value={{
        ...state,
        setIndex,
        getProduct,
        getProductsByMedicId,
        getProducts,
        createProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
