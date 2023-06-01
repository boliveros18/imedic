import { FC, ReactNode, useReducer, useCallback } from "react";
import { FileContext, fileReducer } from ".";
import { File } from "../../interfaces";
import { FileService } from "../../services";

interface ProviderProps {
  children: ReactNode;
}

export interface State {
  files: File[];
  file: File;
  avatar: File;
}

const INITIAL_STATE: State = {
  files: [],
  file: {} as File,
  avatar: {} as File
};

export const FileProvider: FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(fileReducer, INITIAL_STATE);

  const setAvatar = useCallback(async (payload: File) => {
    dispatch({ type: "UPDATE_AVATAR", payload: payload });
  }, []);

  const createFile = async (payload: File) => {
    const data = await FileService.createOne(payload);
    dispatch({ type: "UPDATE_FILE", payload: data });
    return data;
  };

  const updateFile = async (id: string, payload: File) => {
    const data = await FileService.updateOne(id, payload);
    dispatch({ type: "UPDATE_FILE", payload: data });
    return data;
  };

  const deleteFile = async (id: string) => {
    const data = await FileService.deleteOne(id);
    dispatch({ type: "DELETE_FILE", payload: id });
    return data;
  };

  const getFilesByParentIdAndType = useCallback(
    async (parent_id: string, type: string) => {
      const data = await FileService.getFilesByParentIdAndType(
        parent_id,
        type
      );
      dispatch({ type: "UPDATE_FILE", payload: data });
      return data;
    }, []);

  return (
    <FileContext.Provider
      value={{
        ...state,
        setAvatar,
        createFile,
        updateFile,
        deleteFile,
        getFilesByParentIdAndType,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};
