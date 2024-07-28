"use client";
import React, { useState } from "react";
import css from "./style.module.css";
import { useForm, SubmitHandler } from "react-hook-form";



import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

interface LoginFormInput {
  email: string;
  password: string;
}

const Login = () => {
  
  const auth = getAuth();
  const { register, handleSubmit } = useForm<LoginFormInput>();

  const onSubmit: SubmitHandler<LoginFormInput> = async (data) => {
    try {
      console.log(data);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const user = userCredential.user;
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <form className={css.login__form} onSubmit={handleSubmit(onSubmit)}>
     
        <h2>Sign in</h2>
 
      <p>
        Don't have an account yet?<a href="#!">Sing up</a>
      </p>

      <input
        placeholder="Your username or email"
        {...register("email", { required: true })}
      />
      <input
        placeholder="Password"
        type="password"
        {...register("password", { required: true })}
      />
      <div className={css.rememberandforgot__wrapper}>
        <div className={css.remember__wrapper}>
          <input type="checkbox" />
          <label>Remember me</label>
        </div>
        <a href="#!">Forgot password?</a>
      </div>
      <button className={css.signIn__button}>Sign in</button>
    </form>
  );
};

export default Login;
