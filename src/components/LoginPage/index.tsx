import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Layout from "@/components/Common/Layout";

import "react-toastify/dist/ReactToastify.css";
import { LoginFormInput } from "@/types/auth";
import { requestToSignIn, requestToSignUp } from "@/requests/auth";
import useAsync from "~/src/hooks/useAsync";

export default function LoginPage() {
  const router = useRouter();
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

  const { loading: logInLoading, execute: executeLogIn } = useAsync(
    (email, password) => requestToSignIn(email, password),
    "로그인 성공!"
  );

  const { loading: signUpLoading, execute: executeSignUp } = useAsync(
    (email, password) => requestToSignUp(email, password),
    "회원가입을 위해 이메일을 확인해 주세요!"
  );

  async function handleLogIn({ email, password }: LoginFormInput) {
    const result = await executeLogIn(email, password);
    if (result) {
      router.replace("/games");
    }
  }

  async function handleSignUp({ email, password }: LoginFormInput) {
    const result = await executeSignUp(email, password);
    if (result) {
      router.push("/games");
    }
  }

  const isLoading = logInLoading || signUpLoading;

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

          {isLoading ? (
            <div className="flex justify-center">
              <h1>Loading...</h1>
            </div>
          ) : (
            <>
              <button
                className="block mx-auto mb-4 rounded-sm bg-blue-500 py-2 px-3"
                type="button"
                onClick={handleSubmit(handleLogIn)}
              >
                Log in
              </button>
              <button
                className="block mx-auto mb-4 rounded-sm bg-orange-500 py-2 px-3"
                type="button"
                onClick={handleSubmit(handleSignUp)}
              >
                Sign up
              </button>
            </>
          )}
        </form>
      </main>
    </Layout>
  );
}
