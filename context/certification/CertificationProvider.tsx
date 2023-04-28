import { FC, ReactNode, useReducer, useCallback } from "react";
import { CertificationContext, certificationReducer } from ".";
import { Certification } from "../../interfaces";
import { CertificationService } from "../../services";

interface ProviderProps {
  children: ReactNode;
}

export interface State {
  certifications: Certification[];
  certification: Certification;
}

const INITIAL_STATE: State = {
  certifications: [],
  certification: {} as Certification,
};

export const CertificationProvider: FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(certificationReducer, INITIAL_STATE);

  const addCertifications = useCallback((payload: Certification[]) => {
    dispatch({ type: "ADD_CERTIFICATIONS", payload });
  }, []);

  const updateCertification = async (id: string, payload: Certification) => {
    const { status, data } = await CertificationService.updateOne(id, payload);
    if (status) dispatch({ type: "CERTIFICATION_UPDATED", payload: data });
    return data;
  };

  return (
    <CertificationContext.Provider
      value={{ ...state, addCertifications, updateCertification }}
    >
      {children}
    </CertificationContext.Provider>
  );
};
