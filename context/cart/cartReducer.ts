import { CartState } from "./";
import { CartProduct, ShippingAddress } from "../../interfaces";

type CartActionType =
  | { type: "LOADCART_FROM_COOKIES | STORAGE"; payload: CartProduct[] }
  | { type: "UPDATE_PRODUCTS_IN_CART"; payload: CartProduct[] }
  | { type: "CHANGE_CART_QUANTITY"; payload: CartProduct }
  | { type: "REMOVE_PRODUCT_IN_CART"; payload: CartProduct }
  | { type: "LOADADDRESS_FROM_COOKIES"; payload: ShippingAddress }
  | { type: "UPDATE_ADDRESS"; payload: ShippingAddress }
  | {
      type: "UPDATE_ORDER_SUMMARY";
      payload: {
        numberOfItems: number;
        subTotal: number;
        tax: number;
        total: number;
      };
    }
  | { type: "ORDER_COMPLETE" };

export const cartReducer = (
  state: CartState,
  action: CartActionType
): CartState => {
  switch (action.type) {
    case "LOADCART_FROM_COOKIES | STORAGE":
      return {
        ...state,
        isLoaded: true,
        cart: [...action.payload],
      };

    case "UPDATE_PRODUCTS_IN_CART":
      return {
        ...state,
        cart: [...action.payload],
      };

    case "CHANGE_CART_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (product._id !== action.payload._id) return product;
          if (product.size !== action.payload.size) return product;
          return action.payload;
        }),
      };

    case "REMOVE_PRODUCT_IN_CART":
      return {
        ...state,
        cart: state.cart.filter(
          (product) =>
            !(
              product._id === action.payload._id &&
              product.size === action.payload.size
            )
        ),
      };

    case "UPDATE_ORDER_SUMMARY":
      return {
        ...state,
        ...action.payload,
      };

    case "UPDATE_ADDRESS":
    case "LOADADDRESS_FROM_COOKIES":
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case "ORDER_COMPLETE":
      return {
        ...state,
        cart: [],
        numberOfItems: 0,
        subTotal: 0,
        tax: 0,
        total: 0,
      };

    default:
      return state;
  }
};
