import { FC, ReactNode, useReducer, useCallback } from "react";
import { ProcedureContext, procedureReducer } from ".";
import { Procedure } from "../../interfaces";
import { ProcedureService } from "../../services";

interface ProviderProps {
  children: ReactNode;
}

export interface State {
  procedures: Procedure[];
  procedure: Procedure;
}

const INITIAL_STATE: State = {
  procedures: [],
  procedure: {} as Procedure,
};

export const ProcedureProvider: FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(procedureReducer, INITIAL_STATE);

  const getProceduresByMedicId = useCallback(async (medic_id: string) => {
    const data = await ProcedureService.getProceduresByMedicId(medic_id);
    dispatch({ type: "GET_PROCEDURES", payload: data });
    return data;
  }, []);

  const createProcedure = async (payload: Procedure) => {
    const data = await ProcedureService.createOne(payload);
    dispatch({ type: "UPDATE_PROCEDURE", payload: data });
    return data;
  };

  const updateProcedure = async (id: string, payload: Procedure) => {
    const data = await ProcedureService.updateOne(id, payload);
    dispatch({ type: "UPDATE_PROCEDURE", payload: data });
    return data;
  };

  const deleteProcedure = async (id: string) => {
    const data = await ProcedureService.deleteOne(id);
    dispatch({ type: "DELETE_PROCEDURE", payload: data });
    return data;
  };
  return (
    <ProcedureContext.Provider
      value={{
        ...state,
        getProceduresByMedicId,
        createProcedure,
        updateProcedure,
        deleteProcedure,
      }}
    >
      {children}
    </ProcedureContext.Provider>
  );
};
