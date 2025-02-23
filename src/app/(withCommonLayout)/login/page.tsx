"use client";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/slices/authSlice";
import { saveUserInfo } from "@/services/authServices";
import { decodedToken } from "@/utils/jwt";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  phone: string;
  password: string;
}

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true);
    // Handle form submission
    try {
      const response = await axios.post(
        "https://server-flate-share.vercel.app/api/login",
        // "http://localhost:5000/api/login",
        data
      );
      const accessToken = response?.data?.data?.accessToken;
      if (accessToken) {
        saveUserInfo({ accessToken });
        setIsError(false);

        const user = decodedToken(accessToken);
        dispatch(setUser({ user, token: accessToken }));
        router.push("/");
        // setIsLoading(false);
      }
    } catch (error: any) {
      setError(error?.response?.data?.message);
      setIsError(true);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full md:py-10  flex items-center justify-center md:bg-teal-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 mt-14 md:mt-0">
        {isLoading ? (
          <div className="space-y-6">
            <div className="h-8 bg-teal-100 rounded w-1/3 mx-auto"></div>
            <div className="space-y-4">
              <div className="h-12 bg-teal-100 rounded"></div>
              <div className="h-12 bg-teal-100 rounded"></div>
            </div>
            <div className="h-12 bg-teal-100 rounded w-full"></div>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-semibold text-center text-teal-600">
              Login
            </h2>
            {isError && (
              <p className="text-center text-xs text-red-500 mt-2  ">{error}</p>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone
                </label>
                <input
                  type="phone"
                  id="phone"
                  {...register("phone", { required: "phone is required" })}
                  className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm
                   focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Enter your phone"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full py-3 mt-4 bg-teal-600 text-white font-semibold rounded-md 
                shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-75"
              >
                Login
              </button>
            </form>

            <p className="text-sm mt-2">
              Do not have an account ? Please{" "}
              <span className="text-teal-600">
                <Link href="/signUp">SignUp</Link>
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
