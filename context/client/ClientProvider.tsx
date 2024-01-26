import { FC, ReactNode, useReducer, useCallback } from "react";
import { ClientContext, clientReducer } from ".";
import { Client } from "../../interfaces";
import { ClientService } from "../../services";
import { Pagination } from ".";

interface ProviderProps {
  children: ReactNode;
}

export interface State {
  clients: Client[];
  client: Client;
}

const INITIAL_STATE: State = {
  clients: [],
  client: {} as Client,
};

export const ClientProvider: FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(clientReducer, INITIAL_STATE);

  const setClient = useCallback(async (payload: Client) => {
    dispatch({ type: "UPDATE_CLIENT", payload: payload });
  }, []);

  const getClient = useCallback(async (id: string) => {
    const data = await ClientService.getClientByUserId(id);
    dispatch({ type: "GET_CLIENT", payload: data[0] });
    return data;
  }, []);

  const getClients = async (pagination?: Pagination) => {
    const data = await ClientService.getClients();
    dispatch({ type: "GET_CLIENTS", payload: data });
    return data;
  };

  const createClient = async (payload: Client) => {
    const data = await ClientService.createOne(payload);
    dispatch({ type: "CREATE_CLIENT", payload: data });
    return data;
  };

  const updateClient = async (id: string, payload: Client) => {
    const data = await ClientService.updateOne(id, payload);
    dispatch({ type: "UPDATE_CLIENT", payload: data });
    return data;
  };

  const deleteClient = async (id: string) => {
    const data = await ClientService.deleteOne(id);
    dispatch({ type: "DELETE_CLIENT", payload: data });
    return data;
  };
  return (
    <ClientContext.Provider
      value={{
        ...state,
        setClient,
        getClient,
        getClients,
        createClient,
        updateClient,
        deleteClient,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};
