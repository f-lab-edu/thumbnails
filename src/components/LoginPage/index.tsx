import { useRouter } from "next/router";
import { createClient } from "@/utils/supabase/component";
import { useForm } from "react-hook-form";
import Layout from "@/components/Common/Layout";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginFormInput } from "@/types/auth";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function logIn({ email, password }: LoginFormInput) {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      toast.error(
        `로그인에 실패하였습니다. 다시 시도해주세요. 이유: ${error.message}`
      );
    } else {
      router.replace("/games");
    }
  }

  async function signUp({ email, password }: LoginFormInput) {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      const errorMsg =
        error.message === "Email rate limit exceeded"
          ? "이메일 사용 API 제한 횟수 초과"
          : error.message;
      toast.error(
        `회원가입에 실패하였습니다. 다시 시도해주세요. 이유: ${errorMsg}`,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    } else {
      router.push("/games");
    }
  }

  return (
    <Layout>
      <main className="mt-60">
        <form>
          <div className="mb-20">
            <div className="w-fit mx-auto mb-10">
              <label htmlFor="email" className="text-lg pr-2 w-4/5">
                Email:
              </label>
              <input
                id="email"
                type="email"
                className="text-black p-2"
                {...register("email", { required: "email을 입력해주세요" })}
              />
              {errors.email && (
                <p role="alert" className="text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="w-fit mx-auto">
              <label htmlFor="password" className="text-lg pr-2">
                Password:
              </label>
              <input
                id="password"
                type="password"
                className="text-black p-2"
                {...register("password", {
                  required: "password를 입력해주세요",
                })}
              />
              {errors.password && (
                <p role="alert" className="text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <button
            className="block mx-auto mb-4 rounded-sm bg-blue-500 py-2 px-3"
            type="button"
            onClick={handleSubmit(logIn)}
          >
            Log in
          </button>
          <button
            className="block mx-auto mb-4 rounded-sm bg-orange-500 py-2 px-3"
            type="button"
            onClick={handleSubmit(signUp)}
          >
            Sign up
          </button>
        </form>
      </main>
    </Layout>
  );
}
