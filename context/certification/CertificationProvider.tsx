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

  const createCertification = async (payload: Certification) => {
    const data = await CertificationService.createOne(payload);
    dispatch({ type: "SET_CERTIFICATION", payload });
    return data;
  };

  const updateCertification = async (id: string, payload: Certification) => {
    const data = await CertificationService.updateOne(id, payload);
    dispatch({ type: "SET_CERTIFICATION", payload: data });
    return data;
  };

  const deleteCertification = async (id: string) => {
    const data = await CertificationService.deleteOne(id);
    dispatch({ type: "SET_CERTIFICATION", payload: id });
    return data;
  };

  const getCertificationsByClinicId = useCallback(async (clinic_id: string) => {
    const data = await CertificationService.getCertificationsByClinicId(
      clinic_id
    );
    dispatch({ type: "SET_CERTIFICATIONS", payload: data });
  }, []);

  return (
    <CertificationContext.Provider
      value={{
        ...state,
        createCertification,
        updateCertification,
        deleteCertification,
        getCertificationsByClinicId,
      }}
    >
      {children}
    </CertificationContext.Provider>
  );
};
