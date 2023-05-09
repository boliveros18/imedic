import { FC, ReactNode, useReducer, useCallback } from "react";
import { DegreeContext, degreeReducer } from "./";
import { Degree } from "../../interfaces";
import { DegreeService } from "../../services";

interface ProviderProps {
  children: ReactNode;
}

export interface State {
  degrees: Degree[];
  degree: Degree;
}

const INITIAL_STATE: State = {
  degrees: [],
  degree: {} as Degree,
};

export const DegreeProvider: FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(degreeReducer, INITIAL_STATE);

  const createDegree = async (payload: Degree) => {
    const data = await DegreeService.createOne(payload);
    dispatch({ type: "CREATE_DEGREE", payload: data });
    return data;
  };

  const updateDegree = async (id: string, payload: Degree) => {
    const data = await DegreeService.updateOne(id, payload);
    dispatch({ type: "UPDATE_DEGREE", payload: data });
    return data;
  };

  const deleteDegree = async (id: string) => {
    const data = await DegreeService.deleteOne(id);
    dispatch({ type: "DELETE_DEGREE", payload: id });
    return data;
  };

  const getDegree = useCallback(async (id: string) => {
    const data = await DegreeService.getDegree(id);
    dispatch({ type: "GET_DEGREE", payload: data });
    return data;
  }, []);

  const getDegreesByMedicId = useCallback(async (medic_id: string) => {
    const data: Degree[] = await DegreeService.getDegreesByMedicId(medic_id);
    dispatch({ type: "ADD_DEGREES", payload: data });
  }, []);

  return (
    <DegreeContext.Provider
      value={{
        ...state,
        createDegree,
        updateDegree,
        deleteDegree,
        getDegree,
        getDegreesByMedicId,
      }}
    >
      {children}
    </DegreeContext.Provider>
  );
};
