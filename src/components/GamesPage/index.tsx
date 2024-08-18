import Layout from "@/components/Common/Layout";
import type { User } from "@supabase/supabase-js";

interface Props {
  user: User;
}

export default function GamesPage({ user }: Props) {
  return (
    <Layout user={user}>
      <div className="flex">
        <div className="h-screen w-1/2 bg-red-400"></div>
        <div className="h-screen w-1/2 bg-blue-400"></div>
      </div>
    </Layout>
  );
}
