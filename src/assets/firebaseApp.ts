import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCCDc4Y8oIgRha4GPu8FZbEGmQ2K-2DPLw",
  authDomain: "plattya-shop.firebaseapp.com",
  projectId: "plattya-shop",
  storageBucket: "plattya-shop.appspot.com",
  messagingSenderId: "462438275368",
  appId: "1:462438275368:web:5929b4b3e914dd8817181d"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage , app};