import { FC, ReactNode, useReducer } from "react";
import { CommentContext, commentReducer } from "./";
import { Comment } from "../../interfaces";
import { CommentService } from "../../services";
import { Pagination } from "./CommentContext";

interface ProviderProps {
  children: ReactNode;
}

export interface State {
  comments: Comment[];
  comment: Comment;
}

const INITIAL_STATE: State = {
  comments: [],
  comment: {} as Comment,
};

export const CommentProvider: FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(commentReducer, INITIAL_STATE);

  const createComment = async (payload: Comment) => {
    const data = await CommentService.createOne(payload);
    dispatch({ type: "CREATE_COMMENT", payload: data });
    return data;
  };

  const updateComment = async (id: string, payload: Comment) => {
    const data = await CommentService.updateOne(id, payload);
    dispatch({ type: "UPDATE_COMMENT", payload: data });
    return data;
  };

  const deleteComment = async (id: string) => {
    const data = await CommentService.deleteOne(id);
    dispatch({ type: "DELETE_COMMENT", payload: id });
    return data;
  };

  const commentsByParentId = (payload: Comment[], parent_id: string) => {
    return payload.filter((i) => i.parent_id === parent_id);
  };

  const getCommentsByParentId = async (
    parent_id: string,
    pagination?: Pagination
  ) => {
    const data: Comment[] = await CommentService.getCommentsByParentId(
      parent_id
    );
    dispatch({ type: "ADD_COMMENTS", payload: data });
  };

  return (
    <CommentContext.Provider
      value={{
        ...state,
        createComment,
        updateComment,
        deleteComment,
        commentsByParentId,
        getCommentsByParentId,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};
