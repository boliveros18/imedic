import { FC, ReactNode, useReducer, useCallback } from "react";
import { LikeContext, likeReducer } from "./";
import { Like } from "../../interfaces";
import { LikeService } from "../../services";
import { Pagination } from "./";

interface ProviderProps {
  children: ReactNode;
}

export interface State {
  likes: Like[];
  like: Like;
  length: number;
}

const INITIAL_STATE: State = {
  likes: [],
  like: {} as Like,
  length: 0
};

export const LikeProvider: FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(likeReducer, INITIAL_STATE);

  const createLike = async (payload: Like) => {
    const data = await LikeService.createOne(payload);
    dispatch({ type: "ADD_LIKES", payload: data });
    return data;
  };

  const deleteLike = async (id: string) => {
    const data = await LikeService.deleteOne(id);
    dispatch({ type: "DELETE_LIKE", payload: id });
    return data;
  };

  const addLikes = useCallback((payload: Like) => {
    dispatch({ type: "ADD_LIKES", payload: payload });
  }, []);

  const setLength = useCallback((payload: number) => {
    dispatch({ type: "SET_ITEM_LENGTH", payload: payload });
  }, []);

  const likeByParentAndUserId = (
    payload: Like[],
    parent_id: string,
    user_id: string
  ) => {
    return payload.filter(
      (i) => i.parent_id === parent_id && i.user_id === user_id
    );
  };

  const likesByParentId = (payload: Like[], parent_id: string) => {
    return payload.filter((i) => i.parent_id === parent_id);
  };

  const getLikesByParentId = useCallback( async (
    parent_id: string,
    pagination?: Pagination
  ) => {
    const data: Like[] = await LikeService.getLikesByParentId(
      parent_id
    );
    dispatch({ type: "ADD_LIKES", payload: data });
  }, []);

  return (
    <LikeContext.Provider
      value={{
        ...state,
        createLike,
        deleteLike,
        addLikes,
        likeByParentAndUserId,
        likesByParentId,
        getLikesByParentId,
        setLength
      }}
    >
      {children}
    </LikeContext.Provider>
  );
};
