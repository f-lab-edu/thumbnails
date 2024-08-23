import { useState, useCallback } from "react";
import { toast } from "react-toastify";

type AsyncFunction<T> = (...args: any[]) => Promise<T>;

/**
 * useAsync 훅은 비동기 작업을 처리하고, 로딩 상태, 에러 메시지, 결과 데이터를 관리하는 데 사용됩니다.
 *
 * @template T - 비동기 작업이 반환하는 데이터의 타입입니다.
 * @param {AsyncFunction<T>} asyncFunction - 비동기 작업을 수행하는 함수입니다. 이 함수는 Promise<T>를 반환해야 합니다.
 * @param {string} defaultMessage - 에러 발생 시 기본으로 표시할 메시지입니다.
 * @returns {{
 *  loading: boolean;
 *  error: string | null;
 *  data: T | null;
 *  execute: (...args: Parameters<AsyncFunction<T>>) => Promise<T | undefined>;
 * }}
 * - `loading`: 비동기 작업이 진행 중인지 나타내는 상태입니다.
 * - `error`: 비동기 작업 중 발생한 에러 메시지입니다. 에러가 없을 경우 null입니다.
 * - `data`: 비동기 작업의 성공적인 결과 데이터입니다. 아직 데이터가 없거나 작업이 실패한 경우 null입니다.
 * - `execute`: 비동기 작업을 실행하는 함수입니다. 이 함수는 필요한 인수를 받아 비동기 작업을 수행합니다.
 *
 * @example
 * ```typescript
 * const { execute, loading, error } = useAsync(
 *   (email: string, password: string) => requestToSignIn(supabase, email, password),
 *   "로그인에 실패하였습니다. 다시 시도해주세요."
 * );
 *
 * const handleLogIn = async ({ email, password }: LoginFormInput) => {
 *   const result = await execute(email, password);
 *   if (result) {
 *     router.replace("/games");
 *   }
 * };
 * ```
 */
function useAsync<T>(
  asyncFunction: AsyncFunction<T>,
  defaultSuccessMessage: string,
  defaultErrorMessage: string
) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  const execute = useCallback(
    (...args: Parameters<AsyncFunction<T>>) => {
      setLoading(true);
      setError(null);

      return asyncFunction(...args)
        .then((response) => {
          setData(response);
          toast.success(defaultSuccessMessage);
          return response;
        })
        .catch((error: unknown) => {
          const errorMessage =
            error instanceof Error ? error.message : String(error);
          setError(errorMessage);
          throw new Error(`${defaultErrorMessage} 이유: ${errorMessage}`);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [asyncFunction, defaultErrorMessage]
  );

  return { loading, error, data, execute };
}

export default useAsync;
