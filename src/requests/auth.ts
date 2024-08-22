import { createClient } from "@/utils/supabase/component";
import type { UserResponse } from "@supabase/supabase-js";

const supabase = createClient();

export async function authenticateUser(): Promise<UserResponse> {
  const supabase = createClient();
  return await supabase.auth.getUser();
}

export async function requestToSignIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw new Error(error.message);
  } else {
    return data;
  }
}

export async function requestToSignUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) {
    throw new Error(error.message);
  } else {
    return data;
  }
}
