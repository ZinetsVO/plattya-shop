import React from 'react'
import { StaticImageData } from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import css from "./style.module.css";

const subCategorySchema = z.object({
    name: z
      .string()
      .min(3, "Category Name is required")
      .max(50, "Category Name cannot exceed 50 characters"),
    image: z.any(),
  });
  
  interface ISubCategoryInput {
    name: string;
    image: StaticImageData;
  }

const index: React.FC = () => {
  return (
    <div>

    </div>
  )
}

export default index