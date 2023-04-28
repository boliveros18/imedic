import { createContext } from "react";
import { Certification } from "../../interfaces";

interface ContextProps {
  certifications: Certification[];
  certification: Certification;
  addCertifications: (payload: Certification[]) => void;
  updateCertification: (id: string, payload: Certification) => Promise<void>;
}

export const CertificationContext = createContext({} as ContextProps);
