import dynamic from "next/dynamic";

const GamesPage = dynamic(() => import("@/components/GamesPage"), {
  ssr: false,
});

export default GamesPage;
