import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/logo-t.png";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowCPassword = () => {
    setShowCPassword(!showCPassword);
  };

  const checkUser = async () => {
    const regex = /\S+@\S+\.\S+/;

    if (!email) {
      toast.error("Email id is required");
    } else if (!password) {
      toast.error("Password is required");
    } else if (!cpassword) {
      toast.error("Please enter confirm password");
    } else {
      if (cpassword !== password) {
        toast.error("Passwords do not match!");
        return;
      }

      if (!regex.test(email)) {
        toast.error("Invalid Email format");
      }

      let formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("type", "candidate");
      try {
        let res;

        res = await axios.post(
          `http://localhost:5000/auth/registerCandidate`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (res.data) {
          toast.success("Signed Up");
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      } catch (ex) {
        console.log(ex);
      }
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <Toaster />
      <NavLink to="/" className="fixed top-10 left-10">
        <img src={Logo} className="w-auto h-10" alt="Logo" />
      </NavLink>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <div className="flex items-center mb-6 text-3xl font-semibold text-gray-900 dark:text-white">
          Sign Up
        </div>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your work email
                </label>
                <input
                  onChange={(event) => setEmail(event.target.value)}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    onChange={(event) => setPassword(event.target.value)}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                  <span
                    onClick={toggleShowPassword}
                    className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-6 w-6 text-gray-500 dark:text-gray-400"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 12l2-2m0 0l2-2m-2 2l2 2m-2-2l2 2m8-2l2-2m0 0l2-2m-2 2l2 2m-2-2l2 2"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-6 w-6 text-gray-500 dark:text-gray-400"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2 12s3-8 10-8 10 8 10 8-3 8-10 8-10-8-10-8z"
                        ></path>
                      </svg>
                    )}
                  </span>
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showCPassword ? "text" : "password"}
                    onChange={(event) => setCpassword(event.target.value)}
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                  <span
                    onClick={toggleShowCPassword}
                    className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
                  >
                    {showCPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-6 w-6 text-gray-500 dark:text-gray-400"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 12l2-2m0 0l2-2m-2 2l2 2m-2-2l2 2m8-2l2-2m0 0l2-2m-2 2l2 2"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-6 w-6 text-gray-500 dark:text-gray-400"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2 12s3-8 10-8 10 8 10 8-3 8-10 8-10-8-10-8z"
                        ></path>
                      </svg>
                    )}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => checkUser()}
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 bg-sky-500 hover:bg-sky-700 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign Up
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <NavLink
                  to="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login
                </NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
