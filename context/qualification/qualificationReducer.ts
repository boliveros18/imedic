import { State } from "./";

type Action =
  | "QUALIFICATION_UPDATED"
  | "QUALIFICATION_CREATE"
  | "QUALIFICATION_GET";
type ActionType = { type: Action; payload?: any };

export const qualificationReducer = (
  state: State,
  action: ActionType
): State => {
  switch (action.type) {
    case "QUALIFICATION_CREATE":
      return { ...state, qualification: action.payload };
    case "QUALIFICATION_UPDATED":
      return { ...state, qualification: action.payload };
    case "QUALIFICATION_GET":
      return { ...state, qualification: action.payload };
    default:
      return state;
  }
};
