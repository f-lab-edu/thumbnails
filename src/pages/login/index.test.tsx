import { getServerSideProps } from "@/pages/login";
import { vi } from "vitest";
import { createClient } from "@/utils/supabase/server-props";
import type { GetServerSidePropsContext } from "next";

// Mock the required modules
vi.mock("next/router", () => ({
  useRouter: vi.fn(),
}));

// createClient 함수 모킹
vi.mock("@/utils/supabase/server-props", () => ({
  createClient: vi.fn(),
}));

describe("getServerSideProps", () => {
  const context = {} as GetServerSidePropsContext;

  it("/games로 리디렉션해야 함 (사용자가 인증된 경우)", async () => {
    const mockSupabase = {
      auth: {
        getUser: vi.fn().mockResolvedValue({
          data: { user: true },
        }),
      },
    };

    (createClient as any).mockReturnValue(mockSupabase);

    const result = await getServerSideProps(context);
    expect(result).toEqual({
      redirect: {
        destination: "/games",
        permanent: false,
      },
    });
  });

  it("props를 반환해야 함 (사용자가 인증되지 않은 경우)", async () => {
    const mockSupabase = {
      auth: {
        getUser: vi.fn().mockResolvedValue({
          data: { user: null },
        }),
      },
    };

    (createClient as any).mockReturnValue(mockSupabase);

    const result = await getServerSideProps(context);
    expect(result).toEqual({
      props: {},
    });
  });
});
