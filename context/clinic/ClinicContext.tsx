import { createContext } from "react";
import { Clinic } from "../../interfaces";

interface ContextProps {
  clinics: Clinic[];
  clinic: Clinic;
  principal: Clinic;
  setPrincipal: (payload: Clinic) => void;
  getClinicsByMedicId: (medic_id: string) => void;
  getClinic: (id: string) => Promise<void>;
  createClinic: (payload: Clinic) => Promise<void>;
  updateClinic: (id: string, payload: Clinic) => Promise<void>;
  deleteClinic: (id: string) => Promise<void>;
}

export const ClinicContext = createContext({} as ContextProps);
