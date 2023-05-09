import { State } from "./";

type Action =
  | "UPDATE_DEGREE"
  | "GET_DEGREE"
  | "ADD_DEGREES"
  | "CREATE_DEGREE"
  | "DELETE_DEGREE";
type ActionType = { type: Action; payload?: any };

export const degreeReducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case "UPDATE_DEGREE":
      return { ...state, degree: action.payload };
    case "GET_DEGREE":
      return { ...state, degree: action.payload };
    case "ADD_DEGREES":
      return { ...state, degrees: action.payload };
    case "CREATE_DEGREE":
      return { ...state, degree: action.payload };
    case "DELETE_DEGREE":
      const filtered = state.degrees.filter(
        (item) => item._id !== action.payload
      );
      return { ...state, degrees: filtered };
    default:
      return state;
  }
};
