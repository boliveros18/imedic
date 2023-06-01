import { State } from ".";

type Action =
  | "UPDATE_FILE"
  | "UPDATE_AVATAR"
  | "UPDATE_FILES"
  | "DELETE_FILE"
  | "ADD_FILES";
type ActionType = { type: Action; payload?: any };

export const fileReducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case "UPDATE_FILE":
      return { ...state, file: action.payload };
    case "UPDATE_AVATAR":
      return { ...state, avatar: action.payload };
    case "UPDATE_FILES":
      return { ...state, files: action.payload };
    case "DELETE_FILE":
      const filtered = state.files.filter(
        (item) => item._id !== action.payload
      );
      return { ...state, files: filtered };
    case "ADD_FILES":
      const attach = state.files.concat(action.payload);
      const files = attach.filter(
        (object, index) =>
          attach.findIndex((item) => item._id === object._id) === index
      );
      return { ...state, files: files };
    default:
      return state;
  }
};
