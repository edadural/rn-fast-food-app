import React, { createContext, ReactNode, useContext } from "react";

import { getCurrentUser } from "./appwrite";
import useAppwrite from "./useAppwrite";
interface User {
  $id: string;
  name: string;
  email: string;
  avatar: string;
  phone?: string;
  address?: string;
}

interface GlobalContextType {
  isLogged: boolean;
  user: User | null;
  loading: boolean;
  refetch: (newParams: Record<string, string | number>) => Promise<void>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user,
    loading,
    error,
    refetch,
  } = useAppwrite({
    fn: getCurrentUser,
  });

  if (error) {
    // Handle the error here, e.g., redirect to login page
    // return <LoginScreen />;
  }

  const isLogged = !!user;

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        user,
        loading,
        refetch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context)
    throw new Error("useGlobalContext must be used within a GlobalProvider");

  return context;
};

export default GlobalProvider;
