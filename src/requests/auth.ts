import { createClient } from "@/utils/supabase/component";
import { LoginError, SignUpError } from "~/src/utils/common/errors";
import { userStorage } from "@/utils/storage/index";
import { User } from "@supabase/supabase-js";

const supabase = createClient();

// 유저 이메일을 스토리지에 설정하고 반환하는 공통 함수
function handleUserData(user?: User | null): User {
  if (user) {
    userStorage.set(user);
  }
  return userStorage.get();
}

export async function authenticateUser(): Promise<User> {
  const { data } = await supabase.auth.getUser();
  return handleUserData(data.user);
}

export async function requestToSignIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new LoginError(error.message);
  }

  return handleUserData(data.user) ? data : undefined;
}

export async function requestToSignUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    throw new SignUpError(error.message);
  }

  return handleUserData(data.user) ? data : undefined;
}
