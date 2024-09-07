import Layout from "@/components/Common/Layout";
import { userStorage } from "@/storages";

export default function ScorePage() {
  return (
    <Layout>
      <h1>
        Hello, {userStorage.get()?.email || "user"}! This is Your Score Page
      </h1>
      ;
    </Layout>
  );
}
