export { default } from "@/components/ScorePage";

/**
 * Server 환경 테스트를 위해 남겨놓음. 추후 삭제될 예정
 */

// import type { User } from "@supabase/supabase-js";
// import type { GetServerSidePropsContext } from "next";
// import { createClient } from "@/utils/supabase/server-props";
// import ScorePage from "@/components/ScorePage";
// import { getUserEmail } from "@/utils/storage/auth";

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const supabase = createClient(context);

//   return {
//     props: {
//       email: getUserEmail(),
//     },
//   };
// }

// export default function Score({ email }) {
//   console.log("email: ", email);
//   return <ScorePage />;
// }
