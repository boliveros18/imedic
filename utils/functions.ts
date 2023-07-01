import { IncomingMessage } from "http";
import { getSession } from "next-auth/react";
import { dbFiles } from "../database";

export const userData = async (req: IncomingMessage | undefined) =>{
 const session = await getSession({ req });
 const user: any = session?.user;
 user ? delete Object.assign(user, { _id: user.id })["id"] : null;
 const avatar = await dbFiles.getFilesByParentIdAndType(
   user?._id || "",
   "image"
 );
 
 return { user, avatar, session };
}