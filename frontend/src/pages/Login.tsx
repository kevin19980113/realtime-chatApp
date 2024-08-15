import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { loginSchema, loginSchemaType } from "../lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const { login } = useAuth();
  const { mutate: loginMutate, isPending } = login;

  const handleLogin = async (loginData: loginSchemaType) => {
    loginMutate(loginData);
  };
  return (
    <div className="flex flex-col items-center justify-center min-w-[300px] sm:min-w-[400px] mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-white">
          Login
          <span className="text-blue-500"> ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit(handleLogin)}>
          <div>
            <label className="label p-2 ">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              {...register("username")}
              type="text"
              placeholder="Enter username"
              className={`w-full input h-10 ${
                errors.username ? "input-error" : "input-bordered"
              }  `}
              disabled={isPending}
            />
            {errors.username && (
              <p className="text-red-600 mt-2 ml-2">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              {...register("password")}
              type="password"
              placeholder="Enter Password"
              className={`w-full input h-10 ${
                errors.password ? "input-error" : "input-bordered"
              }`}
              disabled={isPending}
            />
            {errors.password && (
              <p className="text-red-600 mt-2 ml-2">
                {errors.password.message}
              </p>
            )}
          </div>
          <Link
            to="/signup"
            className="text-sm  hover:underline text-white hover:text-blue-600 mt-2 inline-block"
          >
            Don&apos;t have an account?
          </Link>

          <div>
            <button className="btn btn-block btn-sm mt-2" disabled={isPending}>
              {isPending ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
