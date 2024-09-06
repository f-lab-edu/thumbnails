import { createClient } from "@/utils/supabase/component";
import CustomError from "@/utils/common/errors/CustomError";
import { userStorage } from "@/utils/storage/index";
import { User } from "@supabase/supabase-js";
import { SupabaseAuthResponse, SupabaseAuthData } from "@/types/auth";

const supabase = createClient();

// 유저 이메일을 스토리지에 설정하고 반환하는 공통 함수
function handleUserData(user?: User | null): User {
  if (user) {
    userStorage.set(user);
  }
  const storedUser = userStorage.get();
  if (!storedUser) {
    throw new CustomError("유효한 사용자 데이터가 없습니다.");
  }
  return storedUser;
}

async function handleSupabaseRequest(
  responsePromise: Promise<SupabaseAuthResponse>
): Promise<SupabaseAuthData> {
  const { data, error } = await responsePromise;
  if (error) {
    throw new CustomError(`인증 에러가 발생하였습니다. 사유: ${error}`);
  }
  return data;
}

export async function authenticateUser(): Promise<User> {
  try {
    console.log("hihi!!");
    const { data } = await supabase.auth.getUser();
    console.log("data: ", data);
    return handleUserData(data.user);
  } catch {
    throw new CustomError("인증 서버에 오류가 발생하였습니다.");
  }
}

export async function requestToSignIn(email: string, password: string) {
  const data = await handleSupabaseRequest(
    supabase.auth.signInWithPassword({
      email,
      password,
    })
  );

  return handleUserData(data?.user);
}

export async function requestToSignUp(email: string, password: string) {
  const data = await handleSupabaseRequest(
    supabase.auth.signUp({ email, password })
  );

  return handleUserData(data?.user);
}
