import { createContext } from "react";

export interface tagger {
  user_name: string;
  user_id: string;
}

interface ContextProps {
  sidemenuOpen: boolean;
  openSideMenu: () => void;
  closeSideMenu: () => void;
  progress: boolean;
  setProgress: (payload: boolean) => void;
  loading: boolean;
  setLoading: (payload: boolean) => void;
  onFocus: boolean;
  setOnFocus: (payload: boolean) => void;
  tag: tagger;
  setTag: (payload: tagger) => void;
  value: string;
  setValue: (payload: string) => void;
  onCancel: boolean;
  setOnCancel: (payload: boolean) => void;
  country: string;
  setCountry: (payload: string) => void;
  state: string;
  setState: (payload: string) => void;
  city: string;
  setCity: (payload: string) => void;
  pursue: boolean;
  setPursue: (payload: boolean) => void;
}

export const UIContext = createContext({} as ContextProps);
