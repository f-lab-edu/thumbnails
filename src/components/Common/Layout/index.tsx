import Navbar from "@/components/Common/Layout/Navbar";
import React from "react";
import { ToastContainer } from "react-toastify";
import type { User } from "@supabase/supabase-js";

interface Props {
  children: React.ReactNode;
  user?: User;
}

export default function Layout({ children, user }: Props) {
  return (
    <div>
      <Navbar user={user} />
      {children}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
