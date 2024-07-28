
"use client";
import Login from "@/components/SingIn";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, User, signOut } from "firebase/auth";
import { app } from "@/assets/firebaseApp";
import CategoryForm from '@/components/CategoryForm'
const AdminLayout: React.FC = () => {
  const auth = getAuth(app);
  const [user]: [User | undefined | null, boolean, Error | undefined] =
    useAuthState(auth);
  if (!user) return <Login />;

  const logOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (

    <>
      <div>{user.email} ви авторизовані</div>
      <button onClick={logOut}>Log out </button>
    </>
  );
};


export default AdminLayout;
