import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function NavbarTab({ children }: Props) {
  return <div>{children}</div>;
}
