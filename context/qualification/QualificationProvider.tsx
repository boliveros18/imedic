import { FC, ReactNode, useReducer } from "react";
import { QualificationContext, qualificationReducer } from "./";
import { Qualification } from "../../interfaces";
import { QualificationService } from "../../services";

interface ProviderProps {
  children: ReactNode;
}

export interface State {
  qualifications: Qualification[];
  qualification: Qualification;
}

const INITIAL_STATE: State = {
  qualifications: [],
  qualification: {} as Qualification,
};

export const QualificationProvider: FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(qualificationReducer, INITIAL_STATE);

  const createQualification = async (payload: Qualification) => {
    const data = await QualificationService.createOne(payload);
    dispatch({ type: "QUALIFICATION_CREATE", payload: data });
    return data;
  };

  const updateQualification = async (id: string, payload: Qualification) => {
    const data = await QualificationService.updateOne(id, payload);
    dispatch({ type: "QUALIFICATION_UPDATED", payload: data });
    return data;
  };

  const getQualification = async (id: string) => {
    const data = await QualificationService.getQualification(id);
    dispatch({ type: "QUALIFICATION_GET", payload: data });
    return data;
  };

  return (
    <QualificationContext.Provider
      value={{
        ...state,
        createQualification,
        getQualification,
        updateQualification, //, id, setId
      }}
    >
      {children}
    </QualificationContext.Provider>
  );
};
