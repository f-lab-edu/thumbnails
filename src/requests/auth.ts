import { createClient } from "@/utils/supabase/component";
import { setUserEmail } from "~/src/utils/storage/auth";

const supabase = createClient();

// 유저 이메일을 스토리지에 설정하고 반환하는 공통 함수
function handleUserEmail(email?: string) {
  if (email) {
    setUserEmail(email);
    return email;
  }
}

export async function authenticateUser(): Promise<string | undefined> {
  const { data } = await supabase.auth.getUser();
  return handleUserEmail(data.user?.email);
}

export async function requestToSignIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return handleUserEmail(data.user?.email) ? data : undefined;
}

export async function requestToSignUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    throw new Error(error.message);
  }

  return handleUserEmail(data.user?.email) ? data : undefined;
}
