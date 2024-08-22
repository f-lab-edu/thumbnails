import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuthenticate } from "@/queries/auth";

export default function LoginStatus() {
  const { data } = useAuthenticate();
  const [email, setEmail] = useState("Login");

  // useAuthenticate()은 Supabase CSR을 위한 client를 사용하므로,
  useEffect(() => {
    if (data?.data.user?.email) {
      setEmail(data.data.user.email);
    }
  }, [data]);

  return (
    <div className="w-1/6 h-16">
      <div className="flex justify-end">
        <Link href="/login">
          <span className="text-3xl text-black">{email || "Login"}</span>
        </Link>
      </div>
    </div>
  );
}
