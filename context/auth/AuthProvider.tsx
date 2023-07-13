import { FC, useReducer, useEffect, ReactNode, useCallback } from "react";
import { AuthContext, authReducer } from "./";
import { useSession, signOut } from "next-auth/react";
import Cookies from "js-cookie";
import axios from "axios";

import { ApiClient } from "../../apis";
import { AuthService } from "../../services";
import { IUser } from "../../interfaces";

export interface State {
  isLoggedIn: boolean;
  users: IUser[];
  user?: IUser;
  member?: IUser;
}

interface Props {
  children?: ReactNode;
}

const INITIAL_STATE: State = {
  isLoggedIn: false,
  users: [],
  user: undefined,
  member: undefined
};

export const AuthProvider: FC<Props> = ({ children }) => {
  const { data, status } = useSession();
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);

  useEffect(() => {
    if (status === "authenticated") {
      dispatch({ type: "AUTH_LOGIN" });
    }
  }, [status, data]);

  const setUser = useCallback(async (payload: IUser) => {
    dispatch({ type: "UPDATE_USER", payload: payload });
  }, []);

  const loginUser = async (
    email: string,
    password: string
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const { status, data } = await AuthService.login(email, password);
      const { token, user } = data;
      Cookies.set("token", token);
      if (status) {};
      return {
        hasError: false,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }
      return {
        hasError: true,
        message: "Failed to login - Try again",
      };
    }
  };

  const registerUser = async (
    name: string,
    email: string,
    password: string,
    photo: string,
    role: string
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const { data } = await ApiClient.post("/user/register", {
        name,
        email,
        password,
        photo,
        role,
      });
      const { token, user } = data;
      getUserbyEmail(user.email);
      Cookies.set("token", token);
      dispatch({ type: "AUTH_LOGIN" });

      return {
        hasError: false,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }

      return {
        hasError: true,
        message: "Failed to create user - try again",
      };
    }
  };

  const logout = () => {
    Cookies.remove("cart");
    signOut();
  };

  const getUser = useCallback(async (id: string) => {
    const data = await AuthService.getUser(id);
    dispatch({ type: "GET_USER", payload: data });
    return data;
  }, []);

  const getUserbyEmail = useCallback(async (email: string) => {
    const data = await AuthService.getUserByEmail(email);
    dispatch({ type: "GET_USERS", payload: data });
    return data;
  }, []);

  const updateUser = async (
    id: string,
    payload: IUser
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      await AuthService.updateOne(id, payload);
      return {
        hasError: false,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }
      return {
        hasError: true,
        message: "Failed to update user - try again",
      };
    }
  };

  const deleteUser = async (id: string) => {
    const data = await AuthService.deleteOne(id);
    dispatch({ type: "DELETE_USER", payload: data });
    logout();
    return data;
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        setUser,
        loginUser,
        registerUser,
        logout,
        getUser,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
