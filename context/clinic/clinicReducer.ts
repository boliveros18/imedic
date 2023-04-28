import { State } from "./";

type Action =
  | "SET_PRINCIPAL"
  | "UPDATE_CLINIC"
  | "GET_CLINIC"
  | "ADD_CLINICS"
  | "CREATE_CLINIC"
  | "DELETE_CLINIC";
type ActionType = { type: Action; payload?: any };

export const clinicReducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case "SET_PRINCIPAL":
      return { ...state, principal: action.payload };
    case "CREATE_CLINIC":
      return { ...state, clinic: action.payload };
    case "UPDATE_CLINIC":
      return { ...state, clinic: action.payload };
    case "DELETE_CLINIC":
      const filtered = state.clinics.filter(
        (item) => item._id !== action.payload
      );
      return { ...state, clinics: filtered };
    case "GET_CLINIC":
      return { ...state, clinic: action.payload };
    case "ADD_CLINICS":
      return { ...state, clinics: action.payload };
    default:
      return state;
  }
};
