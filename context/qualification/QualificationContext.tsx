import { createContext } from "react";
import { Qualification } from "../../interfaces";

interface ContextProps {
  qualifications: Qualification[];
  qualification: Qualification;
  createQualification: (payload: Qualification) => Promise<void>;
  getQualification: (id: string) => Promise<void>;
  updateQualification: (id: string, payload: Qualification) => Promise<void>;
}

export const QualificationContext = createContext({} as ContextProps);
