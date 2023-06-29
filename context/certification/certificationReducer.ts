import { State } from ".";

type Action = "SET_CERTIFICATION" | "SET_CERTIFICATIONS";
type ActionType = { type: Action; payload?: any };

export const certificationReducer = (
  state: State,
  action: ActionType
): State => {
  switch (action.type) {
    case "SET_CERTIFICATION":
      return { ...state, certification: action.payload };
    case "SET_CERTIFICATIONS":
      return { ...state, certifications: action.payload };
    default:
      return state;
  }
};
