import { FC, ReactNode, useReducer, useCallback } from "react";
import { QuoteContext, quoteReducer } from ".";
import { Quote } from "../../interfaces";
import { QuoteService } from "../../services";

interface ProviderProps {
  children: ReactNode;
}

export interface State {
  quotes: Quote[];
  quote: Quote;
}

const INITIAL_STATE: State = {
  quotes: [],
  quote: {} as Quote,
};

export const QuoteProvider: FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(quoteReducer, INITIAL_STATE);

  const getQuotesByProductId = useCallback(async (product_id: string) => {
    const data = await QuoteService.getQuotesByProductId(product_id);
    dispatch({ type: "GET_QUOTES", payload: data });
    return data;
  }, []);

  const createQuote = async (payload: Quote) => {
    const data = await QuoteService.createOne(payload);
    dispatch({ type: "UPDATE_QUOTE", payload: data });
    return data;
  };

  const updateQuote = async (id: string, payload: Quote) => {
    const data = await QuoteService.updateOne(id, payload);
    dispatch({ type: "UPDATE_QUOTE", payload: data });
    return data;
  };

  const deleteQuote = async (id: string) => {
    const data = await QuoteService.deleteOne(id);
    dispatch({ type: "DELETE_QUOTE", payload: data });
    return data;
  };
  return (
    <QuoteContext.Provider
      value={{
        ...state,
        getQuotesByProductId,
        createQuote,
        updateQuote,
        deleteQuote,
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
};
