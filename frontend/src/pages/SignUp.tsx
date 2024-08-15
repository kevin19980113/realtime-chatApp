import { Link } from "react-router-dom";
import GenderCheckbox from "../components/GenderCheckbox";
import { useForm } from "react-hook-form";
import { signupSchema, signupSchemaType } from "../lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<signupSchemaType>({
    resolver: zodResolver(signupSchema),
  });

  const handleSignUp = async (signupData: signupSchemaType) => {
    console.log("Signup Data:", signupData);
  };

  return (
    <div className="flex flex-col items-center justify-center mx-auto min-w-[300px] sm:min-w-[400px]">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign Up <span className="text-blue-500"> ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit(handleSignUp)}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              {...register("fullName")}
              type="text"
              placeholder="John Doe"
              className={`w-full input h-10 ${
                errors.fullName ? "input-error" : "input-bordered"
              }`}
              disabled={isSubmitting}
            />
            {errors.fullName && (
              <p className="text-red-600 mt-2 ml-2">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div>
            <label className="label p-2 ">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              {...register("username")}
              type="text"
              placeholder="johndoe"
              className={`w-full input h-10 ${
                errors.username ? "input-error" : "input-bordered"
              }`}
              disabled={isSubmitting}
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
              disabled={isSubmitting}
            />
            {errors.password && (
              <p className="text-red-600 mt-2 ml-2">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="Confirm Password"
              className={`w-full input h-10 ${
                errors.confirmPassword ? "input-error" : "input-bordered"
              }`}
              disabled={isSubmitting}
            />
            {errors.confirmPassword && (
              <p className="text-red-600 mt-2 ml-2">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <GenderCheckbox register={register} />
          {errors.gender && (
            <p className="text-red-600 mt-2 ml-2">{errors.gender.message}</p>
          )}
          <Link
            to={"/login"}
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-white"
          >
            Already have an account?
          </Link>

          <div>
            <button
              className="btn btn-block btn-sm mt-2 border border-slate-700"
              disabled={isSubmitting}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
