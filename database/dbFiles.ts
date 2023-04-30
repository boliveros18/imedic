import { db } from ".";
import { File, IFile } from "../models";

export const getFilesByParentIdAndType = async (
  parent_id: string | string[],
  type: string | string[]
): Promise<IFile> => {
  const params = parent_id ? { parent_id: parent_id, type: type } : {};
  await db.connect();
  const files = await File.find(params).lean();
  await db.disconnect();
  return files[0] ? JSON.parse(JSON.stringify(files[0])) : {};
};
