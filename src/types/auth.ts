import {
  UserResponse,
  AuthTokenResponsePassword,
  AuthResponse,
  User,
  Session,
  WeakPassword,
} from "@supabase/supabase-js";
export interface LoginFormInput {
  email: string;
  password: string;
}

export type SupabaseAuthResponse =
  | UserResponse
  | AuthTokenResponsePassword
  | AuthResponse;

type CollectiveSupabaseAuthData = {
  user: User | null;
  session: Session | null;
  weakPassword?: WeakPassword | null;
};

export type SupabaseAuthData = Partial<CollectiveSupabaseAuthData>;
