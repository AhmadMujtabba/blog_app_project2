import "../globals.css";
import { ReactNode } from "react";

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
