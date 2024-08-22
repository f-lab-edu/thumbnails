import { useSuspenseQuery } from "@tanstack/react-query";
import { authenticateUser } from "@/requests/auth";

import {
  createQueryKeys,
  inferQueryKeys,
} from "@lukemorales/query-key-factory";

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
