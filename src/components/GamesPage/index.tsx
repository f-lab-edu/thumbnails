import Layout from "@/components/Common/Layout";

export default function GamesPage() {
  return (
    <Layout>
      <div className="flex">
        <div className="h-screen w-1/2 bg-red-400"></div>
        <div className="h-screen w-1/2 bg-blue-400"></div>
      </div>
    </Layout>
  );
}
