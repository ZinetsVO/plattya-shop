import { db } from "@/assets/firebaseApp";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Array<any>>([]);

  const getCategories = async () => {
    const querySnapshot = await getDocs(collection(db, "categories"));
    console.log("querySnapshot.docs", querySnapshot.docs);
    setCategories(querySnapshot.docs);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <section>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>{category.data().name}</li>
        ))}
      </ul>
    </section>
  );
};

export default CategoryList;
