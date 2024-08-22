import Layout from "@/components/Common/Layout";
import type { User } from "@supabase/supabase-js";

interface Props {
  user: User;
}

export default function ScorePage({ user }: Props) {
  return (
    <Layout>
      <h1>Hello, {user.email || "user"}! This is Your Score Page</h1>;
    </Layout>
  );
}
