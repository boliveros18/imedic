import { createContext } from "react";
import { Comment } from "../../interfaces";

export type Pagination = {
  [key: string | number]: any;
  page: number;
  pageSize: number;
};

interface ContextProps {
  comment: Comment;
  comments: Comment[];
  commentsByParentId: (payload: Comment[], parent_id: string) => Comment[];
  getCommentsByParentId: (parent_id: string, pagination?: Pagination) => void;
  createComment: (payload: Comment) => Promise<void>;
  updateComment: (id: string, payload: Comment) => Promise<void>;
  deleteComment: (id: string) => Promise<void>;
}

export const CommentContext = createContext({} as ContextProps);
