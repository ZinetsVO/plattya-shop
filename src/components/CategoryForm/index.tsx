"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { StaticImageData } from "next/image";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import css from "./style.module.css";
import Image from "next/image";
import useImage from "@/hooks/useImage";
import cn from "classnames";
import { transliterate } from "@/utils/transliterate";
import { addDoc, getDocs, collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/assets/firebaseApp";
import toast, { Toaster } from "react-hot-toast";

const categorySchema = z.object({
  name: z
    .string()
    .min(3, "Category Name is required")
    .max(50, "Category Name cannot exceed 50 characters"),
  image: z.any(),
  description: z
    .string()
    .min(3, "Category description is required")
    .max(300, "Category description cannot exceed 300 characters"),
});

interface ICategoryInput {
  name: string;
  description: string;
  image: StaticImageData;
}

const CategoryForm: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<ICategoryInput>({
    resolver: zodResolver(categorySchema),
  });

  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string>("");
  const [categories, setCategories] = useState<Array<any>>([]);

  const { uploadImage, deleteImage } = useImage();

  const handlePhoto = (e: any) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setUrl(URL.createObjectURL(e.target.files[0]));
    }
  };
  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!file) return alert("Please add an image");
      const imageData = await uploadImage(file);
      const collectionRef = doc(
        db,
        "categories",
        `${new Date().getTime()}-${transliterate(data.name)}`
      );
      if (!imageData.imagePath) return;

      const payLoad = {
        description: data.description,
        name: data.name,
        image: imageData.imageUrl,
        imagePath: imageData.imagePath,
        slug: transliterate(data.name),
      };

      console.log("payload", payLoad);
      console.log("data", data);

      await setDoc(collectionRef, payLoad);
      reset();
      setFile(null);
      setUrl("");
      toast.success("Successfully toasted!");
    } catch (e) {
      toast.error("This didn't work.");
    }
  });

  return (
    <section className="container">
      <h2 className={css.title}>Add Category:</h2>
      <form className={css.category__form} onSubmit={onSubmit}>
        <p>Type a name:</p>
        <label className={css.category__label}>
          <input
            className={css.category__input}
            placeholder="type here..."
            {...register("name", { required: true, maxLength: 50 })}
          />
        </label>
        <p>Type a description:</p>
        <label className={css.category__label}>
          <input
            className={css.category__input}
            placeholder="type here..."
            {...register("description", { required: true, maxLength: 300 })}
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
            <button className={css.image__button} onClick={() => setFile(null)}>
              X
            </button>
          </div>
        ) : (
          <>
            <p>Add image:</p>
            <label className={css.category__label}>
              <input
                className={cn(css.category__input, css.category__file)}
                type="file"
                accept="image/*"
                {...register("image")}
                onChange={(e) => handlePhoto(e)}
              />
            </label>
          </>
        )}

        <button className={css.category__submit} type="submit">
          Submit
        </button>
      </form>

      <Toaster position="top-center" reverseOrder={false} />
    </section>
  );
};

export default CategoryForm;
