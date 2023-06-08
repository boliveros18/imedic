import { createContext } from "react";
import { File } from "../../interfaces";

interface ContextProps {
  avatar: File;
  file: File;
  files: File[];
  setFiles: (payload: File[]) => void;
  setAvatar: (payload: File) => void;
  getFilesByParentIdAndType: (parent_id: string, type: string) => Promise<any>;
  createFile: (payload: File) => Promise<void>;
  updateFile: (id: string, payload: File) => Promise<void>;
  deleteFile: (id: string) => Promise<void>;
}

export const FileContext = createContext({} as ContextProps);
