import Layout from "@/components/Common/Layout";
import type { User } from "@supabase/supabase-js";

export default function ScorePage({ user }: { user: User }) {
  return (
    <Layout>
      <h1>Hello, {user.email || "user"}! This is Your Score Page</h1>;
    </Layout>
  );
}
