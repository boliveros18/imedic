import { State } from ".";

type Action =
  | "SET_INDEX"
  | "GET_PRODUCT"
  | "GET_PRODUCTS"
  | "CREATE_PRODUCT"
  | "UPDATE_PRODUCT"
  | "DELETE_PRODUCT";
type ActionType = { type: Action; payload?: any };

export const productReducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case "SET_INDEX":
      return { ...state, index: action.payload };
    case "GET_PRODUCT":
      return { ...state, product: action.payload };
    case "GET_PRODUCTS":
      return { ...state, products: action.payload };
    case "CREATE_PRODUCT":
      return { ...state, product: action.payload };
    case "UPDATE_PRODUCT":
      return { ...state, product: action.payload };
    case "DELETE_PRODUCT":
      const filtered = state.products.filter(
        (item) => item._id !== action.payload
      );
      return { ...state, products: filtered };
    default:
      return state;
  }
};
