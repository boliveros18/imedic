import { createContext } from "react";
import { CartProduct, ShippingAddress } from "../../interfaces";

interface ContextProps {
  isLoaded: boolean;
  cart: CartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
  shippingAddress?: ShippingAddress;
  addProductToCart: (product: CartProduct) => void;
  updateCartQuantity: (product: CartProduct) => void;
  removeCartProduct: (product: CartProduct) => void;
  updateAddress: (address: ShippingAddress) => void;
  createOrder: () => Promise<{ hasError: boolean; message: string }>;
}

export const CartContext = createContext({} as ContextProps);
