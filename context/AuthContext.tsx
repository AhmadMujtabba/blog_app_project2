"use client";
import { User } from "@/components/Signup";
import { createContext, useState, useMemo, ReactNode } from "react";

type SafeUser = Omit<User, "password">;

interface AuthContextType {
  user: SafeUser | undefined;
  setUser: React.Dispatch<React.SetStateAction<SafeUser | undefined>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<SafeUser | undefined>(undefined);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
