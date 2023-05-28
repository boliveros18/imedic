import { db } from ".";
import { Quote, IQuote } from "../models";

export const getQuotesByProductId = async (
  product_id: string
): Promise<IQuote[]> => {
  const params = product_id ? { product_id: product_id } : {};
  await db.connect();
  const quotes: IQuote[] = await Quote.find(params).sort({
    createdAt: "ascending",
  });
  await db.disconnect();
  return JSON.parse(JSON.stringify(quotes));
};
