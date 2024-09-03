import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { authenticateUser } from "@/requests/auth";
import { createQueryKeys } from "@lukemorales/query-key-factory";
import { userStorage } from "@/utils/storage";

const authenticateQueryOptions = queryOptions({
  queryKey: ["authenticate"],
  queryFn: authenticateUser,
  // staleTime: 300 * 1000, // Supabase session lasts for 5 minutes ~ 1 hour
  placeholderData: userStorage.get(),
});

export const auth = createQueryKeys("auth", {
  authenticate: {
    queryKey: null,
    queryFn: authenticateUser,
  },
});

export function useAuthenticate() {
  return useSuspenseQuery(authenticateQueryOptions);
}
