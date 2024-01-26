import { createContext } from "react";
import { Client } from "../../interfaces";

export type Pagination = {
  [key: string | number]: any;
  page: number;
  pageSize: number;
};

interface ContextProps {
  client: Client;
  clients: Client[];
  setClient: (payload: Client) => Promise<void>;
  getClient: (id: string) => Promise<void>;
  getClients: (pagination?: Pagination) => Promise<void>;
  createClient: (payload: Client) => Promise<void>;
  updateClient: (id: string, payload: Client) => Promise<void>;
  deleteClient: (id: string) => Promise<void>;
}

export const ClientContext = createContext({} as ContextProps);
