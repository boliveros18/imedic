import { createContext } from "react";
import { File } from "../../interfaces";

interface ContextProps {
  file: File;
  files: File[];
  setFile: (payload: File) => void;
  getFilesByParentIdAndType: (parent_id: string, type: string) => Promise<File>;
  createFile: (payload: File) => Promise<void>;
  updateFile: (id: string, payload: File) => Promise<void>;
  deleteFile: (id: string) => Promise<void>;
}

export const FileContext = createContext({} as ContextProps);
