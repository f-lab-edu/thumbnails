import { createClient } from "@/utils/supabase/server-props";
import LoginPage from "@/components/LoginPage";
import type { GetServerSidePropsContext } from "next";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createClient(context);

  const { data } = await supabase.auth.getUser();
  if (data.user) {
    return {
      redirect: {
        destination: "/games",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Login() {
  return <LoginPage />;
}
