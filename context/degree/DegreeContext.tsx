import { createContext } from "react";
import { Degree } from "../../interfaces";

interface ContextProps {
  degrees: Degree[];
  degree: Degree;
  getDegreesByMedicId: (medic_id: string) => void;
  getDegree: (id: string) => Promise<void>;
  createDegree: (payload: Degree) => Promise<void>;
  updateDegree: (id: string, payload: Degree) => Promise<void>;
  deleteDegree: (id: string) => Promise<void>;
}

export const DegreeContext = createContext({} as ContextProps);
