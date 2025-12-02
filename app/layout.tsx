import "./globals.css";
import { ReactNode } from "react";
import { AuthProvider } from "@/context/AuthContext";

interface ChildProp {
  readonly children: ReactNode;
}
export default function RootLayout({ children }: ChildProp) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
