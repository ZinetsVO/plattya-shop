"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { StaticImageData } from "next/image";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import css from "./style.module.css";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/assets/firebase";
import Image from "next/image";
import useImage from "@/hooks/useImage";

const categorySchema = z.object({
  name: z
    .string()
    .min(3, "Category Name is required")
    .max(50, "Category Name cannot exceed 50 characters"),
  image: z.any(),
});

interface ICategoryInput {
  name: string;
  image: StaticImageData;
}

const CategoryForm: React.FC = () => {
  const { register, handleSubmit } = useForm<ICategoryInput>({
    resolver: zodResolver(categorySchema),
  });

  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string>("");

  const { uploadImage, deleteImage } = useImage();

  const handlePhoto = (e: any) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const onSubmit: SubmitHandler<ICategoryInput> = async (data) => {
    console.log("category data: ", data);
    if (!file) return alert("Please add an image");
    const imageData = await uploadImage(file);
    console.log(imageData);

    
  };

  return (
    <section className="container">
      <h2 className={css.title}>Add Category:</h2>
      <form className={css.category__form} onSubmit={handleSubmit(onSubmit)}>
        <label className={css.category__label}>
          <p>Type a name:</p>
          <input
            className={css.category__input}
            placeholder="type here..."
            {...register("name", { required: true, maxLength: 50 })}
          />
        </label>

        {file ? (
          <div className={css.image__wrapper}>
            <Image
            className={css.category__image}
            src={url}
            alt="Uploaded file"
            width={200}
            height={200}
          />
          <button className={css.image__button} onClick={() => setFile(null)}>X</button>
          </div>
        ) : (
          <label className={css.category__label}>
            <p>Add image:</p>
            <input
              className={css.category__input}
              type="file"
              accept="image/*"
              {...register("image")}
              onChange={(e) => handlePhoto(e)}
            />
          </label>
        )}

        <input className={css.category__submit} type="submit" />
      </form>
    </section>
  );
};

export default CategoryForm;
