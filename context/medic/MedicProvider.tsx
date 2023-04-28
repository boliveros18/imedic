import { FC, ReactNode, useReducer, useCallback } from "react";
import { MedicContext, medicReducer } from ".";
import { Medic } from "../../interfaces";
import { MedicService } from "../../services";
import { Pagination } from ".";

interface ProviderProps {
  children: ReactNode;
}

export interface State {
  medics: Medic[];
  medic: Medic;
}

const INITIAL_STATE: State = {
  medics: [],
  medic: {} as Medic,
};

export const MedicProvider: FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(medicReducer, INITIAL_STATE);

  const setMedic = useCallback(async (payload: Medic) => {
    dispatch({ type: "UPDATE_MEDIC", payload: payload });
  }, []);

  const getMedic = useCallback(async (id: string) => {
    const data = await MedicService.getMedicByUserId(id);
    dispatch({ type: "GET_MEDIC", payload: data[0] });
    return data;
  }, []);

  const getMedics = async (pagination?: Pagination) => {
    const data = await MedicService.getMedics();
    dispatch({ type: "GET_MEDICS", payload: data });
    return data;
  };

  const createMedic = async (payload: Medic) => {
    const data = await MedicService.createOne(payload);
    dispatch({ type: "CREATE_MEDIC", payload: data });
    return data;
  };

  const updateMedic = async (id: string, payload: Medic) => {
    const data = await MedicService.updateOne(id, payload);
    dispatch({ type: "UPDATE_MEDIC", payload: data });
    return data;
  };

  const deleteMedic = async (id: string) => {
    const data = await MedicService.deleteOne(id);
    dispatch({ type: "DELETE_MEDIC", payload: data });
    return data;
  };
  return (
    <MedicContext.Provider
      value={{
        ...state,
        setMedic,
        getMedic,
        getMedics,
        createMedic,
        updateMedic,
        deleteMedic,
      }}
    >
      {children}
    </MedicContext.Provider>
  );
};
