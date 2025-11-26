"use client";
import { createContext, useState } from "react";
import { ReactNode } from "react";

interface ChildProp {
  children: ReactNode;
}
interface User {
  id: string;
  name: string;
  email: string;
}
interface AuthContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: ChildProp) => {
  const [user, setUser] = useState<User>({ id: "", name: "" ,email:""});
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
