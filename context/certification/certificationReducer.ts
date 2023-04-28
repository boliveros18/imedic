import { State } from ".";

type Action = "ADD_CERTIFICATIONS" | "CERTIFICATION_UPDATED";
type ActionType = { type: Action; payload?: any };

export const certificationReducer = (
  state: State,
  action: ActionType
): State => {
  switch (action.type) {
    case "ADD_CERTIFICATIONS":
      return { ...state, certifications: action.payload };
    case "CERTIFICATION_UPDATED":
      return { ...state, certification: action.payload };
    default:
      return state;
  }
};
