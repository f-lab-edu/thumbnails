import { useEffect } from "react";
import { useRouter } from "next/router";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: true,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  /**
   * 처리되지 않은 Promise 거부 이벤트를 처리하는 함수입니다.
   *
   * 이 함수는 `PromiseRejectionEvent`를 받아 콘솔에 경고 메시지를 출력하고,
   * 사용자를 `/error` 페이지로 리다이렉트합니다. 또한, 사용자에게 에러를 알리는
   * 토스트 메시지를 표시합니다.
   *
   * @param event - 처리되지 않은 Promise 거부 이벤트를 나타내는 객체입니다.
   *                `event.reason`은 거부된 이유를 설명하는 메시지 또는 객체입니다.
   *
   * @returns 없음 (void)
   */
  const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
    console.warn(`UNHANDLED PROMISE REJECTION: ${event.reason}`);
    router.push("/error");
    toast.error(`에러가 발생하였습니다. 이유: ${event.reason}`);
  };

  useEffect(() => {
    window.addEventListener("unhandledrejection", handleUnhandledRejection);
    return () => {
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection
      );
    };
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
