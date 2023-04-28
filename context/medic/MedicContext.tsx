import { createContext } from "react";
import { Medic } from "../../interfaces";

export type Pagination = {
  [key: string | number]: any;
  page: number;
  pageSize: number;
};

interface ContextProps {
  medic: Medic;
  medics: Medic[];
  setMedic: (payload: Medic) => Promise<void>;
  getMedic: (id: string) => Promise<void>;
  getMedics: (pagination?: Pagination) => Promise<void>;
  createMedic: (payload: Medic) => Promise<void>;
  updateMedic: (id: string, payload: Medic) => Promise<void>;
  deleteMedic: (id: string) => Promise<void>;
}

export const MedicContext = createContext({} as ContextProps);
