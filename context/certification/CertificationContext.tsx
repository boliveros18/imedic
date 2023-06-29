import { createContext } from "react";
import { Certification } from "../../interfaces";

interface ContextProps {
  certifications: Certification[];
  certification: Certification;
  getCertificationsByClinicId: (clinic_id: string) => void;
  createCertification: (payload: Certification) => Promise<void>;
  updateCertification: (id: string, payload: Certification) => Promise<void>;
  deleteCertification: (id: string) => Promise<void>;
}

export const CertificationContext = createContext({} as ContextProps);
