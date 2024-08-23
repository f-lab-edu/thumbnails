import Layout from "@/components/Common/Layout";
import { getUserEmail } from "@/utils/storage/auth";

export default function ScorePage() {
  return (
    <Layout>
      <h1>Hello, {getUserEmail() || "user"}! This is Your Score Page</h1>;
    </Layout>
  );
}
