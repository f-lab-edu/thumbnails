import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { authenticateUser } from "@/requests/auth";
import { userStorage } from "@/storages";

const authenticateQueryOptions = queryOptions({
  queryKey: ["authenticate"],
  queryFn: authenticateUser,
  // staleTime: 300 * 1000, // Supabase session lasts for 5 minutes ~ 1 hour
  placeholderData: userStorage.get(),
});

export function useAuthenticate() {
  return useSuspenseQuery(authenticateQueryOptions);
}
