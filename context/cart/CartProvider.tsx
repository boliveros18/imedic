import { FC, useEffect, useReducer, ReactNode } from "react";
import Cookie from "js-cookie";
import axios from "axios";

import { CartProduct, Order, ShippingAddress } from "../../interfaces";
import { CartContext, cartReducer } from "./";
import { ApiClient } from "../../apis";

interface Props {
  children?: ReactNode;
}

export interface CartState {
  isLoaded: boolean;
  cart: CartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
  shippingAddress?: ShippingAddress;
}

const CART_INITIAL_STATE: CartState = {
  isLoaded: false,
  cart: [],
  numberOfItems: 0,
  subTotal: 0,
  tax: 0,
  total: 0,
  shippingAddress: undefined,
};

export const CartProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  useEffect(() => {
    try {
      const cookieProducts = Cookie.get("cart")
        ? JSON.parse(Cookie.get("cart")!)
        : [];
      dispatch({
        type: "LOADCART_FROM_COOKIES | STORAGE",
        payload: cookieProducts,
      });
    } catch (error) {
      dispatch({
        type: "LOADCART_FROM_COOKIES | STORAGE",
        payload: [],
      });
    }
  }, []);

  useEffect(() => {
    if (Cookie.get("firstName")) {
      const shippingAddress = {
        firstName: Cookie.get("firstName") || "",
        lastName: Cookie.get("lastName") || "",
        address: Cookie.get("address") || "",
        address2: Cookie.get("address2") || "",
        zip: Cookie.get("zip") || "",
        city: Cookie.get("city") || "",
        country: Cookie.get("country") || "",
        phone: Cookie.get("phone") || "",
      };

      dispatch({
        type: "LOADADDRESS_FROM_COOKIES",
        payload: shippingAddress,
      });
    }
  }, []);

  useEffect(() => {
    Cookie.set("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    const numberOfItems = state.cart.reduce(
      (prev, current) => current.quantity + prev,
      0
    );
    const subTotal = state.cart.reduce(
      (prev, current) => current.price * current.quantity + prev,
      0
    );
    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

    const orderSummary = {
      numberOfItems,
      subTotal,
      tax: subTotal * taxRate,
      total: subTotal * (taxRate + 1),
    };

    dispatch({ type: "UPDATE_ORDER_SUMMARY", payload: orderSummary });
  }, [state.cart]);

  const addProductToCart = (product: CartProduct) => {
    const productInCart = state.cart.some((p) => p._id === product._id);
    if (!productInCart)
      return dispatch({
        type: "UPDATE_PRODUCTS_IN_CART",
        payload: [...state.cart, product],
      });

    const productInCartButDifferentSize = state.cart.some(
      (p) => p._id === product._id && p.size === product.size
    );
    if (!productInCartButDifferentSize)
      return dispatch({
        type: "UPDATE_PRODUCTS_IN_CART",
        payload: [...state.cart, product],
      });

    const updatedProducts = state.cart.map((p) => {
      if (p._id !== product._id) return p;
      if (p.size !== product.size) return p;
      p.quantity += product.quantity;
      return p;
    });

    dispatch({
      type: "UPDATE_PRODUCTS_IN_CART",
      payload: updatedProducts,
    });
  };

  const updateCartQuantity = (product: CartProduct) => {
    dispatch({ type: "CHANGE_CART_QUANTITY", payload: product });
  };

  const removeCartProduct = (product: CartProduct) => {
    dispatch({ type: "REMOVE_PRODUCT_IN_CART", payload: product });
  };

  const updateAddress = (address: ShippingAddress) => {
    Cookie.set("firstName", address.firstName);
    Cookie.set("lastName", address.lastName);
    Cookie.set("address", address.address);
    Cookie.set("address2", address.address2 || "");
    Cookie.set("zip", address.zip);
    Cookie.set("city", address.city);
    Cookie.set("country", address.country);
    Cookie.set("phone", address.phone);

    dispatch({ type: "UPDATE_ADDRESS", payload: address });
  };

  const createOrder = async (): Promise<{
    hasError: boolean;
    message: string;
  }> => {
    if (!state.shippingAddress) {
      throw new Error("There is no delivery address");
    }

    const body: Order = {
      orderItems: state.cart.map((p) => ({
        ...p,
        size: p.size!,
      })),
      shippingAddress: state.shippingAddress,
      numberOfItems: state.numberOfItems,
      subTotal: state.subTotal,
      tax: state.tax,
      total: state.total,
      isPaid: false,
    };

    try {
      const { data } = await ApiClient.post<Order>("/orders", body);
      dispatch({ type: "ORDER_COMPLETE" });
      return {
        hasError: false,
        message: data._id!,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }
      return {
        hasError: true,
        message: "Unhandled error, talk to administrator",
      };
    }
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addProductToCart,
        removeCartProduct,
        updateCartQuantity,
        updateAddress,
        createOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
