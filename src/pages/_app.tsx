import { useState } from "react";
import "@/styles/globals.css";
// import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
// import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import type { AppProps } from "next/app";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: true,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  // Create a new supabase browser client on every first render.
  // const [supabaseClient] = useState(() => createPagesBrowserClient());

  return (
    // <SessionContextProvider
    //   supabaseClient={supabaseClient}
    //   initialSession={pageProps.initialSession}
    // >
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    // </SessionContextProvider>
  );
}
