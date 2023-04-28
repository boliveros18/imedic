import { State } from ".";

type Action =
  | "GET_MEDIC"
  | "GET_MEDICS"
  | "CREATE_MEDIC"
  | "UPDATE_MEDIC"
  | "DELETE_MEDIC";
type ActionType = { type: Action; payload?: any };

export const medicReducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case "GET_MEDIC":
      return { ...state, medic: action.payload };
    case "GET_MEDICS":
      return { ...state, medics: action.payload };
    case "CREATE_MEDIC":
      return { ...state, medic: action.payload };
    case "UPDATE_MEDIC":
      return { ...state, medic: action.payload };
    case "DELETE_MEDIC":
      const filtered = state.medics.filter(
        (item) => item._id !== action.payload
      );
      return { ...state, medics: filtered };
    default:
      return state;
  }
};
