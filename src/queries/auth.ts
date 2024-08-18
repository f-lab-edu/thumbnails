import { createClient } from "@/utils/supabase/component";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { User } from "@supabase/supabase-js";
import {
  createQueryKeys,
  inferQueryKeys,
} from "@lukemorales/query-key-factory";

async function authenticateUser(): Promise<User | null> {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
  return null;
}

export const auth = createQueryKeys("auth", {
  authenticate: {
    queryKey: null,
    queryFn: authenticateUser,
  },
});

export function useAuthenticate() {
  return useSuspenseQuery(auth.authenticate);
}

export type TodoKeys = inferQueryKeys<typeof auth>;
