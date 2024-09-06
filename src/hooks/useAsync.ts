import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import { AsyncFunction } from "@/types/common";

/**
 * 비동기 함수를 처리하고 로딩 상태, 에러 상태, 그리고 데이터를 관리하는 커스텀 훅.
 *
 * @template T - 비동기 함수의 반환 타입
 *
 * @param {AsyncFunction<T>} asyncFunction - 실행할 비동기 함수
 * @param {string} defaultSuccessMessage - 성공적으로 함수가 실행된 후 표시할 기본 성공 메시지
 * @param {string} [defaultErrorMessage] - 함수 실행 중 에러가 발생할 경우 표시할 기본 에러 메시지 (선택적)
 *
 * @returns {{
 *  loading: boolean;
 *  error: string | null;
 *  data: T | null;
 *  execute: (...args: Parameters<AsyncFunction<T>>) => Promise<T | void>;
 * }} 로딩 상태, 에러 메시지, 데이터, 비동기 함수를 실행할 수 있는 execute 함수를 반환
 *
 * @example
 * ```ts
 * const { loading, error, data, execute } = useAsync(fetchData, "데이터 로드 성공", "데이터 로드 실패");
 *
 * useEffect(() => {
 *   execute();
 * }, [execute]);
 * ```
 */
function useAsync<T>(
  asyncFunction: AsyncFunction<T>,
  defaultSuccessMessage: string,
  defaultErrorMessage?: string
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
          toast.error(errorMessage);
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
