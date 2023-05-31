import { db } from ".";
import { Procedure, IProcedure } from "../models";

export const getProceduresByMedicId = async (
  medic_id: string
): Promise<IProcedure[]> => {
  const params = medic_id ? { medic_id: medic_id } : {};
  await db.connect();
  const procedures: IProcedure[] = await Procedure.find(params).sort({
    createdAt: "ascending",
  });
  await db.disconnect();
  return JSON.parse(JSON.stringify(procedures));
};
