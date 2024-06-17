"use client";

import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { LoginComponentProperties } from "../../properties/components.auth.properties";
import { styles } from "../../styles/styles";
import { LoginSchema } from "../../schemas/authentiation.schemas";
import { useLoginMutation } from "../../redux/features/apis/auth-api";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

const Login: FC<LoginComponentProperties> = ({ setRoute, setOpen }) => {
  const [show, setShow] = useState(false);
  const [login, { isLoading, error, isSuccess, data }] = useLoginMutation();

  // FORMIK FUNCTION
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: LoginSchema,
    onSubmit: async ({ email, password }) => {
      await login({ email, password });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Logged in successfully");
      setOpen(false);
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full">
      <h1 className={`${styles.title}`}>Login with ELearn</h1>
      <form onSubmit={handleSubmit} className="mb-2">
        <label htmlFor="email" className={`${styles.label}`}>
          Enter your Email
        </label>
        <input
          type="email"
          name=""
          value={values.email}
          onChange={handleChange}
          id="email"
          placeholder="loginmail@gmail.com"
          className={`${errors.email && touched.email && "border-red-500"} ${
            styles.input
          }`}
        />
        {errors.email && touched.email && (
          <span className="text-red-500 pt-2 block">{errors.email}</span>
        )}

        <div className="w-full mt-5 relative mb-1">
          <label htmlFor="password" className={`${styles.label}`}>
            Enter your Password
          </label>
          <input
            type={!show ? "password" : "text"}
            name="password"
            value={values.password}
            onChange={handleChange}
            id="password"
            placeholder="password!@%"
            className={`${
              errors.password && touched.password && "border-red-500"
            } ${styles.input}`}
          />
          {!show ? (
            <AiOutlineEyeInvisible
              className="absolute bottom-3 right-2 z-1 cursor-pointer dark:text-white text-black"
              size={20}
              onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEye
              className="absolute bottom-3 right-2 z-1 cursor-pointer dark:text-white text-black"
              size={20}
              onClick={() => setShow(false)}
            />
          )}
        </div>
        {errors.password && touched.password && (
          <span className="text-red-500 pt-2 block">{errors.password}</span>
        )}
        <div className="w-full mt-[2rem] mb-[4rem]">
          <input
            type="submit"
            value={`${isLoading ? "Logging In..." : "Login"}`}
            className={`${styles.button}`}
          />
        </div>
        <hr />
        <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
          Or join us with
        </h5>
        <div className="flex items-center justify-center my-2">
          <FcGoogle
            size={30}
            className="cursor-pointer mr-2"
            onClick={() => signIn("google")}
          />
          <AiFillGithub
            size={30}
            className="cursor-pointer ml-2 dark:text-white text-black"
            onClick={() => signIn("github")}
          />
        </div>
        <h5 className="text-center pt-2 font-Poppins text-[14px] text-black dark:text-white">
          Not have any account?{" "}
          <span
            className="text-[#2190ff] pl-1 cursor-pointer"
            onClick={() => setRoute("Sign-Up")}
          >
            Sign up
          </span>
        </h5>
      </form>
    </div>
  );
};

export default Login;
