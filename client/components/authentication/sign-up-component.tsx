"use client";

import React, { FC, useState } from "react";
import { SignUpComponentProperties } from "@/properties/components.auth.properties";
import { useFormik } from "formik";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { styles } from "../../styles/styles";
import { SignUpSchema } from "../../schemas/authentiation.schemas";

const SignUP: FC<SignUpComponentProperties> = ({ setRoute }) => {
  const [show, setShow] = useState(false);

  // FORMIK FUNCTION
  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: SignUpSchema,
    onSubmit: async () => {
      setRoute("Verification");
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full">
      <h1 className={`${styles.title}`}>Join to ELearning</h1>
      <form onSubmit={handleSubmit} className="mb-2">
        <label htmlFor="name" className={`${styles.label}`}>
          Enter your Name
        </label>
        <input
          type="text"
          name=""
          value={values.name}
          onChange={handleChange}
          id="name"
          placeholder="John Doe"
          className={`${errors.name && touched.name && "border-red-500"} ${
            styles.input
          }`}
        />
        {errors.name && touched.name && (
          <span className="text-red-500 pt-2 block">{errors.name}</span>
        )}

        <div className="w-full mt-5 relative mb-1">
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
        </div>

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
        <div className="w-full mt-5">
          <input type="submit" value="Sign Up" className={`${styles.button}`} />
        </div>
        <br />
        <hr />
        <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
          Or join us with
        </h5>
        <div className="flex items-center justify-center my-2">
          <FcGoogle size={30} className="cursor-pointer mr-2" />
          <AiFillGithub
            size={30}
            className="cursor-pointer ml-2 dark:text-white text-black"
          />
        </div>
        <h5 className="text-center pt-2 font-Poppins text-[14px] text-black dark:text-white">
          Already have an account?{" "}
          <span
            className="text-[#2190ff] pl-1 cursor-pointer"
            onClick={() => setRoute("Login")}
          >
            Sign in
          </span>
        </h5>
      </form>
    </div>
  );
};

export default SignUP;
