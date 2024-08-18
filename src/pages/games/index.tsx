import type { User } from "@supabase/supabase-js";
import type { GetServerSidePropsContext } from "next";
import { createClient } from "@/utils/supabase/server-props";
import GamesPage from "@/components/GamesPage";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createClient(context);

  const { data } = await supabase.auth.getUser();
  return {
    props: {
      user: data.user,
    },
  };
}

export default function Games({ user }: { user: User }) {
  return <GamesPage user={user} />;
}
