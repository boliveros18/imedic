import { createContext } from "react";
import { Procedure } from "../../interfaces";

interface ContextProps {
  procedure: Procedure;
  procedures: Procedure[];
  getProceduresByMedicId: (medic_id: string) => Promise<void>;
  createProcedure: (payload: Procedure) => Promise<void>;
  updateProcedure: (id: string, payload: Procedure) => Promise<void>;
  deleteProcedure: (id: string) => Promise<void>;
}

export const ProcedureContext = createContext({} as ContextProps);
