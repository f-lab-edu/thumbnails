import Navbar from "@/components/Layout/Navbar";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
