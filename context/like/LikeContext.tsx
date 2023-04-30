import { createContext } from "react";
import { Like, Reaction } from "../../interfaces";


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
  getLikesByParentIdAndUserId: (parent_id: string, user_id: string) => Promise<Like>;
  getLikesLengthByParentId: (parent_id: string) => void;
  reactions: Reaction[];
  reactionByParentId: ( parent_id: string, payload: Reaction[]) => Reaction[];
  createLike: (payload: Like) => Promise<void>;
  deleteLike: (id: string) => Promise<void>;
}

export const LikeContext = createContext({} as ContextProps);
