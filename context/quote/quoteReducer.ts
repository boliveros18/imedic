import { State } from ".";

type Action =
  | "GET_QUOTES"
  | "UPDATE_QUOTE"
  | "DELETE_QUOTE";
type ActionType = { type: Action; payload?: any };

export const quoteReducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case "GET_QUOTES":
      return { ...state, quotes: action.payload };
    case "UPDATE_QUOTE":
      return { ...state, quote: action.payload };
    case "DELETE_QUOTE":
      const filtered = state.quotes.filter(
        (item) => item._id !== action.payload
      );
      return { ...state, quotes: filtered };
    default:
      return state;
  }
};
