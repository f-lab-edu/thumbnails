import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LoginStatus from "~/src/components/Common/Layout/LoginStatus";

export default function Navbar() {
  const pathname = usePathname();

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
      <ErrorBoundary fallback={<div>Something went wrong.</div>}>
        <Suspense fallback={<span>Loading...</span>}>
          <LoginStatus />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
