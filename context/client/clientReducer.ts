import { State } from ".";

type Action =
  | "GET_CLIENT"
  | "GET_CLIENTS"
  | "CREATE_CLIENT"
  | "UPDATE_CLIENT"
  | "DELETE_CLIENT";
type ActionType = { type: Action; payload?: any };

export const clientReducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case "GET_CLIENT":
      return { ...state, client: action.payload };
    case "GET_CLIENTS":
      return { ...state, clients: action.payload };
    case "CREATE_CLIENT":
      return { ...state, client: action.payload };
    case "UPDATE_CLIENT":
      return { ...state, client: action.payload };
    case "DELETE_CLIENT":
      const filtered = state.clients.filter(
        (item) => item._id !== action.payload
      );
      return { ...state, clients: filtered };
    default:
      return state;
  }
};
