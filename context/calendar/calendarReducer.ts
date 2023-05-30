import { State } from ".";

type Action =
  | "GET_CALENDAR"
type ActionType = { type: Action; payload?: any };

export const calendarReducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case "GET_CALENDAR":
      return { ...state, calendar: action.payload };
    default:
      return state;
  }
};
