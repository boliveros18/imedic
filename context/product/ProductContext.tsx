import { createContext } from "react";
import { Product } from "../../interfaces";

export type Pagination = {
  [key: string | number]: any;
  page: number;
  pageSize: number;
};

interface ContextProps {
  index: number;
  setIndex: (index: number) => void;
  product: Product;
  products: Product[];
  getProduct: (id: string) => Promise<void>;
  getProductsByMedicId: (medic_id: string) => Promise<void>;
  getProducts: (pagination?: Pagination) => Promise<void>;
  createProduct: (payload: Product) => Promise<void>;
  updateProduct: (id: string, payload: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

export const ProductContext = createContext({} as ContextProps);
