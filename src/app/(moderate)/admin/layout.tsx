"use client";
import Login from "@/components/SingIn";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, User, signOut } from "firebase/auth";
import { app } from "@/assets/firebaseApp";
import CategoryForm from "@/components/CategoryForm";
import { CiLogout } from "react-icons/ci";
import css from "@/app/(moderate)/admin/style.module.css";
import toast, { Toaster } from "react-hot-toast";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const auth = getAuth(app);
  const [user]: [User | undefined | null, boolean, Error | undefined] =
    useAuthState(auth);
  if (!user) return <Login />;

  

  const logOutAsk = () => {
   toast((t) => (
    <span>
      Are you sure ? <button onClick={() => {logOut() } }> Yes/</button>
      <button onClick={() => toast.dismiss(t.id)}>No</button>
    </span>
  ));
  }
  const logOut = ()=>{
 
    signOut(auth)
      .then(() => {
        toast.dismiss();
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (<>
    <div className="container">
      <div className={css.logOut__wrapper}>
        <div>{user.email} ви авторизовані</div>
        <button className={css.logOut__button} onClick={logOutAsk}>
          Log out <CiLogout />
        </button>
      </div>

      {children}
    </div>
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
    </>
  );
}
