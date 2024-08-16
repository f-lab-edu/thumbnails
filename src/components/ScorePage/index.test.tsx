import { render } from "@testing-library/react";
import ScorePage from "@/components/ScorePage";
import type { User } from "@supabase/supabase-js";

describe("ScorePage", () => {
  it("renders the user's email if provided", () => {
    const mockUser: User = {
      id: "123",
      aud: "",
      role: "",
      email: "test@example.com",
      app_metadata: {},
      user_metadata: {},
      created_at: "",
      confirmed_at: "",
      last_sign_in_at: "",
      updated_at: "",
    };

    const { getByText } = render(<ScorePage user={mockUser} />);

    expect(
      getByText("Hello, test@example.com! This is Your Score Page")
    ).toBeDefined();
  });
});
