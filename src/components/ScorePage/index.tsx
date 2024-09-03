import Layout from "@/components/Common/Layout";
import { userStorage } from "@/utils/storage";

export default function ScorePage() {
  return (
    <Layout>
      <h1>
        Hello, {userStorage.get().email || "user"}! This is Your Score Page
      </h1>
      ;
    </Layout>
  );
}
