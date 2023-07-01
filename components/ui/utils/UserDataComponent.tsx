import { FC, useContext, useEffect } from "react";
import { AuthContext } from "../../../context/auth";
import { FileContext } from "../../../context/file";
import { IUser, File } from "../../../interfaces";

interface Props {
    user: IUser;
    avatar: File;
  }
  
export const UserDataComponent: FC<Props> = ({user, avatar}) => {
    const { setUser } = useContext(AuthContext);
    const { setAvatar } = useContext(FileContext);
    useEffect(() => {
      setUser(user || {} as IUser);
      setAvatar(avatar || {} as File);
    }, [
      user,
      setUser,
      avatar,
      setAvatar,
    ]);  
  
    return(<></>)
  }

export default UserDataComponent;