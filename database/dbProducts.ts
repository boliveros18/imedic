import { db } from ".";
import { Product, IProduct } from "../models";

export const getProductsByMedicId = async (
  medic_id: string
): Promise<IProduct[]> => {
  const params = medic_id ? { medic_id: medic_id } : {};
  await db.connect();
  const products: IProduct[] = await Product.find(params).sort({
    createdAt: "ascending",
  });
  await db.disconnect();
  return JSON.parse(JSON.stringify(products));
};
