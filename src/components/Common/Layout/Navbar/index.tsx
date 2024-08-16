import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import profilePic from "@/assets/t.webp";
import { useRouter } from "next/router";
import { createClient } from "@/utils/supabase/component";

export default function Navbar() {
  const router = useRouter();
  const pathname = router.pathname;

  const [email, setEmail] = useState<string | undefined>("Login");

  useEffect(() => {
    const revalidateUser = async () => {
      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();

        setEmail(user?.email);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    revalidateUser();
  }, [email]);

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <div className="sticky top-0 h-16 p-4 w-screen bg-white flex justify-between border-b-2 border-b-gray-400 drop-shadow-lg">
      <div className="w-5/6">
        <Link href="/games">
          <span
            className={`w-fit text-3xl text-black mr-4 hover:text-red-400 ${isActive("/games") ? "text-red-600" : "text-black"} `}
          >
            메뉴
          </span>
        </Link>
        <Link href="/score">
          <span
            className={`w-fit text-3xl  mr-4 hover:text-red-400 ${isActive("/score") ? "text-red-600" : "text-black"}`}
          >
            스코어
          </span>
        </Link>
      </div>
      <div className="w-1/6 h-16">
        <div className="flex justify-end">
          <Image
            src={profilePic}
            width={40}
            height={40}
            alt="profile picture"
            className="mr-2"
          />
          <Link href="/login">
            <span className="text-3xl text-black">{email || "Login"}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
