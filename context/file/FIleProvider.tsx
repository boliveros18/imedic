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
}

const INITIAL_STATE: State = {
  files: [],
  file: {} as File,
};

export const FileProvider: FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(fileReducer, INITIAL_STATE);

  const setFile = useCallback(async (payload: File) => {
    dispatch({ type: "UPDATE_FILE", payload: payload });
  }, []);

  const createFile = async (payload: File) => {
    const data = await FileService.createOne(payload);
    dispatch({ type: "UPDATE_FILE", payload: data });
    return data;
  };

  const updateFile = async (id: string, payload: File) => {
    const data = await FileService.updateOne(id, payload);
    dispatch({ type: "UPDATE_FILE", payload: data })
    return data;
  };

  const getFilesByParentIdAndType = useCallback(
    async (parent_id: string, type: string) => {
      const data: File = await FileService.getFilesByParentIdAndType(
        parent_id,
        type
      );
      data.type === "image"
        ? dispatch({ type: "UPDATE_FILE", payload: data })
        : null;
      return data;
    },
    []
  );

  return (
    <FileContext.Provider
      value={{
        ...state,
        setFile,
        createFile,
        updateFile,
        getFilesByParentIdAndType,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};
