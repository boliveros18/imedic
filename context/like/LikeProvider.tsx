import { FC, ReactNode, useReducer, useCallback } from "react";
import { LikeContext, likeReducer } from "./";
import { Like, Reaction } from "../../interfaces";
import { LikeService } from "../../services";

interface ProviderProps {
  children: ReactNode;
}

export interface State {
  likes: Like[];
  like: Like;
  reactions: Reaction[];
}

const INITIAL_STATE: State = {
  likes: [],
  like: {} as Like,
  reactions: [],
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

  const getLikesByParentIdAndUserId = useCallback(
    async (parent_id: string, user_id: string) => {
      const data = await LikeService.getLikesByParentIdAndUserId(
        parent_id,
        user_id
      );
      dispatch({ type: "ADD_LIKES", payload: data });
      return data;
    },
    []
  );

  const getLikesLengthByParentId = useCallback(async (parent_id: string) => {
    const data = await LikeService.getLikesLengthByParentId(parent_id);
    dispatch({
      type: "ADD_REACTIONS",
      payload: { parent_id: parent_id, likes: data },
    });
  }, []);

  const reactionByParentId = (parent_id: string, payload: Reaction[]) => {
    return payload.filter((i) => i.parent_id === parent_id);
  };

  return (
    <LikeContext.Provider
      value={{
        ...state,
        createLike,
        deleteLike,
        addLikes,
        likeByParentAndUserId,
        likesByParentId,
        getLikesByParentIdAndUserId,
        getLikesLengthByParentId,
        reactionByParentId,
      }}
    >
      {children}
    </LikeContext.Provider>
  );
};
