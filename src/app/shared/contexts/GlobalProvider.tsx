/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import jwtDecode from "jwt-decode";
import { UserType } from "../types/user.type";

type GlobalContextType = {
  auth: {
    isAuthenticated: boolean;
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  };
  loading: {
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
  };
  user: {
    user: UserType;
    setUser: Dispatch<SetStateAction<UserType>>;
  };
};

export const initialStateUser: UserType = {
  id: 0,
  name: "",
  lastname: "",
  email: "",
};

export const GlobalContext = createContext({} as GlobalContextType);

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (context === null)
    throw new Error("useGlobalContext must be used within a GlobalProvider");

  return context;
};

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserType>(initialStateUser);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const jwt = jwtDecode<any>(token);
      setUser(jwt.sub);
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        auth: {
          isAuthenticated,
          setIsAuthenticated,
        },
        loading: {
          isLoading,
          setIsLoading,
        },
        user: {
          user,
          setUser,
        },
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
