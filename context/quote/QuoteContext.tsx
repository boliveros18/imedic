import { createContext } from "react";
import { Quote } from "../../interfaces";

interface ContextProps {
  quote: Quote;
  quotes: Quote[];
  getQuotesByProductId: (product_id: string) => Promise<void>;
  createQuote: (payload: Quote) => Promise<void>;
  updateQuote: (id: string, payload: Quote) => Promise<void>;
  deleteQuote: (id: string) => Promise<void>;
}

export const QuoteContext = createContext({} as ContextProps);
