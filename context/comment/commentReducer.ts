import { State } from "./";

type Action =
  | "CREATE_COMMENT"
  | "UPDATE_COMMENT"
  | "DELETE_COMMENT"
  | "ADD_COMMENTS";
type ActionType = { type: Action; payload?: any };

export const commentReducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case "CREATE_COMMENT":
      return { ...state, comment: action.payload };
    case "UPDATE_COMMENT":
      return { ...state, comment: action.payload };
    case "DELETE_COMMENT":
      const filtered = state.comments.filter(
        (item) => item._id !== action.payload
      );
      return { ...state, comments: filtered };
    case "ADD_COMMENTS":
      const attach = state.comments.concat(action.payload);
      const comments = attach.filter(
        (object, index) =>
          attach.findIndex((item) => item._id === object._id) === index
      );
      return { ...state, comments: comments };
    default:
      return state;
  }
};
