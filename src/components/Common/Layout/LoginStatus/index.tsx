import Link from "next/link";
import { useAuthenticate } from "@/queries/auth";

export default function LoginStatus() {
  const { data } = useAuthenticate();

  return (
    <div className="w-1/6 h-16">
      <div className="flex justify-end">
        <Link href="/login">
          <span className="text-3xl text-black">{data?.email || "Login"}</span>
        </Link>
      </div>
    </div>
  );
}
