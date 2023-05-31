import { State } from ".";

type Action =
  | "GET_PROCEDURES"
  | "UPDATE_PROCEDURE"
  | "DELETE_PROCEDURE";
type ActionType = { type: Action; payload?: any };

export const procedureReducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case "GET_PROCEDURES":
      return { ...state, procedures: action.payload };
    case "UPDATE_PROCEDURE":
      return { ...state, procedure: action.payload };
    case "DELETE_PROCEDURE":
      const filtered = state.procedures.filter(
        (item) => item._id !== action.payload
      );
      return { ...state, procedures: filtered };
    default:
      return state;
  }
};
