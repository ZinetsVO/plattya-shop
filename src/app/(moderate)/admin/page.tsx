"use client";
import CategoryForm from "@/components/CategoryForm";
import CategoryList from "@/components/CategoryList";
import React from "react";

const AdminPage: React.FC = () => {
  return (
    <>
      <CategoryForm />
      <CategoryList />
    </>
  );
};

export default AdminPage;
