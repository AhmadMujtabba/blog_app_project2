import "../globals.css";
import { ReactNode } from "react";
import { AuthProvider } from "@/context/auth.context";

interface LayoutProp {
  readonly children: ReactNode;
}

export default function Layout({ children }: LayoutProp) {
  return (
          <div className="main-posts">
            {children}
          </div>
  );
}
