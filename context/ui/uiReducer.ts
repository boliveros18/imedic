import { State } from "./";

type Action =
  | "UI_OPEN_SIDEBAR"
  | "UI_CLOSE_SIDEBAR"
  | "SET_PROGRESS"
  | "SET_LOADING"
  | "SET_ONFOCUS"
  | "SET_TAG"
  | "SET_VALUE"
  | "SET_ONCANCEL"
  | "SET_COUNTRY"
  | "SET_STATE"
  | "SET_CITY"
  | "SET_PURSUE";
type ActionType = { type: Action; payload?: any };

export const uiReducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case "UI_OPEN_SIDEBAR":
      return {
        ...state,
        sidemenuOpen: true,
      };
    case "UI_CLOSE_SIDEBAR":
      return {
        ...state,
        sidemenuOpen: false,
      };
    case "SET_PROGRESS":
      return { ...state, progress: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ONFOCUS":
      return { ...state, onFocus: action.payload };
    case "SET_TAG":
      return { ...state, tag: action.payload };
    case "SET_VALUE":
      return { ...state, value: action.payload };
    case "SET_ONCANCEL":
      return { ...state, onCancel: action.payload };
    case "SET_COUNTRY":
      return { ...state, country: action.payload };
    case "SET_STATE":
      return { ...state, state: action.payload };
    case "SET_CITY":
      return { ...state, city: action.payload };
    case "SET_PURSUE":
      return { ...state, pursue: action.payload };
    default:
      return state;
  }
};
