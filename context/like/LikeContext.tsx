import { createContext } from "react";
import { Like } from "../../interfaces";

export type Pagination = {
  [key: string | number]: any;
  page: number;
  pageSize: number;
};

interface ContextProps {
  like: Like;
  likes: Like[];
  addLikes: (payload: Like) => void;
  likeByParentAndUserId: (
    payload: Like[],
    parent_id: string,
    user_id: string
  ) => Like[];
  likesByParentId: (payload: Like[], parent_id: string) => Like[];
  getLikesByParentId: (
    parent_id: string,
    pagination?: Pagination
  ) => void;
  length: number;
  setLength: (payload: number) => void;
  createLike: (payload: Like) => Promise<void>;
  deleteLike: (id: string) => Promise<void>;
}

export const LikeContext = createContext({} as ContextProps);
