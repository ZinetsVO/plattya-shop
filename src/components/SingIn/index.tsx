"use client";
import React, { useState } from "react";
import css from "./style.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
interface LoginFormInput {
  email: string;
  password: string;
}

const Login = () => {
  const auth = getAuth();
  const { register, handleSubmit, reset } = useForm<LoginFormInput>();

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
      toast.error("Неправильний пароль або email.");
      reset(); 
    }
    
  };

  return (
    <>
       <Toaster position="top-center" reverseOrder={true} />
      <form className={css.login__form} onSubmit={handleSubmit(onSubmit)}>
     
        <h2>Sign in</h2>
        <input
          className={css.name__input}
          placeholder="Your username or email"
          {...register("email", { required: true })}
        />
        <input
          className={css.password__input}
          placeholder="Password"
          type="password"
          {...register("password", { required: true })}

        />
        <button className={css.signIn__button}>Sign in</button>
      </form>
    </>
  );
};

export default Login;
