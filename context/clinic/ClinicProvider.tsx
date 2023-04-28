import { FC, ReactNode, useReducer, useCallback } from "react";
import { ClinicContext, clinicReducer } from "./";
import { Clinic } from "../../interfaces";
import { ClinicService } from "../../services";

interface ProviderProps {
  children: ReactNode;
}

export interface State {
  clinics: Clinic[];
  clinic: Clinic;
  principal: Clinic;
}

const INITIAL_STATE: State = {
  clinics: [],
  clinic: {} as Clinic,
  principal: {} as Clinic,
};

export const ClinicProvider: FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(clinicReducer, INITIAL_STATE);

  const setPrincipal = useCallback((payload: Clinic) => {
    dispatch({ type: "SET_PRINCIPAL", payload });
  }, []);

  const createClinic = async (payload: Clinic) => {
    const data = await ClinicService.createOne(payload);
    dispatch({ type: "CREATE_CLINIC", payload: data });
    return data;
  };

  const updateClinic = async (id: string, payload: Clinic) => {
    const data = await ClinicService.updateOne(id, payload);
    dispatch({ type: "UPDATE_CLINIC", payload: data });
    return data;
  };

  const deleteClinic = async (id: string) => {
    const data = await ClinicService.deleteOne(id);
    dispatch({ type: "DELETE_CLINIC", payload: id });
    return data;
  };

  const getClinic = useCallback(async (id: string) => {
    const data = await ClinicService.getClinic(id);
    dispatch({ type: "GET_CLINIC", payload: data });
    return data;
  }, []);

  const getClinicsByMedicId = useCallback( async (medic_id: string) => {
    const data: Clinic[] = await ClinicService.getClinicsByMedicId(medic_id);
    dispatch({ type: "ADD_CLINICS", payload: data });
  }, []);

  return (
    <ClinicContext.Provider
      value={{
        ...state,
        setPrincipal,
        createClinic,
        updateClinic,
        deleteClinic,
        getClinic,
        getClinicsByMedicId,
      }}
    >
      {children}
    </ClinicContext.Provider>
  );
};
