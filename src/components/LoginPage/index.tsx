import { useRouter } from "next/router";
import { createClient } from "@/utils/supabase/component";
import { useForm } from "react-hook-form";

interface LoginFormInput {
  email: string;
  password: string;
}

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
      // toast error
    }
    router.push("/games");
  }

  async function signUp({ email, password }: LoginFormInput) {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      console.error(error);
    }
    router.push("/games");
  }

  return (
    <main className="mt-60">
      <form>
        <div className="mb-20">
          <div className="w-fit mx-auto mb-10">
            <label htmlFor="email" className="text-lg pr-2 w-4/5">
              Email:
            </label>
            <input
              type="email"
              className="text-black p-2"
              {...register("email", { required: "email을 입력해주세요" })}
            />
            {errors.email && <p role="alert">{errors.email.message}</p>}
          </div>
          <div className="w-fit mx-auto">
            <label htmlFor="password" className="text-lg pr-2">
              Password:
            </label>
            <input
              type="password"
              className="text-black p-2"
              {...register("password", { required: "password를 입력해주세요" })}
            />
            {errors.password && <p role="alert">{errors.password.message}</p>}
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
  );
}
