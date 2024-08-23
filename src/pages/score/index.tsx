import type { User } from "@supabase/supabase-js";
import type { GetServerSidePropsContext } from "next";
import { createClient } from "@/utils/supabase/server-props";
import ScorePage from "@/components/ScorePage";
import { getUserEmail } from "@/utils/storage/auth";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createClient(context);

  return {
    props: {
      email: getUserEmail(),
    },
  };
}

export default function Score({ email }) {
  console.log("email: ", email);
  return <ScorePage />;
}

// import dynamic from "next/dynamic";

// const ScorePage = dynamic(() => import("@/components/ScorePage"), {
//   ssr: false,
// });

// export default ScorePage;
