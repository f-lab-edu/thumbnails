import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="h-5/6 text-center text-9xl pt-72">Thumbnails</div>
      <div className="flex justify-center pt-20">
        <Link href="/games">
          <button className="px-10 py-4 mx-10 text-xg bg-red-500 rounded-xl">
            Start
          </button>
        </Link>
        <Link href="/login">
          <button className="px-10 py-4 mx-10 text-xg bg-blue-500 rounded-xl">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
}
