import "../globals.css";
import { ReactNode } from "react";
import { AuthProvider } from "@/context/auth.context";

interface LayoutProp {
  readonly children: ReactNode;
}

export default function Layout({ children }: LayoutProp) {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <div className="main-posts">
            {children}
          </div>
        </body>
      </html>
    </AuthProvider>
  );
}
