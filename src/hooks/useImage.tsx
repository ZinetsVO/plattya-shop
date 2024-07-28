import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "@/assets/firebaseApp";

export default function useImage() {
  const uploadImage = async (file: File) => {
    const imageRef = ref(storage, `images/${new Date().getTime()}-${file.name}`);
    const snap = await uploadBytes(imageRef, file);
    const url = await getDownloadURL(ref(storage, snap.ref.fullPath));
    return {
      imageUrl: url,
      imagePath: snap.ref.fullPath,
    };
  };

  const deleteImage = async (imagePath: string) => {
    const imageRef = ref(storage, imagePath);
    try {
      await deleteObject(imageRef);
      console.log("Зображення успішно видалено");
    } catch (error) {
      console.error("Помилка при видаленні зображення:", error);
    }
  };
  return { uploadImage, deleteImage };
}
