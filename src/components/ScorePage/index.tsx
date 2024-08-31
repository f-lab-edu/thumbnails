import Layout from "@/components/Common/Layout";
import { emailStorage } from "@/utils/storage";

export default function ScorePage() {
  return (
    <Layout>
      <h1>Hello, {emailStorage.get() || "user"}! This is Your Score Page</h1>;
    </Layout>
  );
}
