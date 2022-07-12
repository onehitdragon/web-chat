import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDvIwKRvlETudlr39ZMGSO7Ah4T5KXAqdA",
    authDomain: "webchat-435d3.firebaseapp.com",
    projectId: "webchat-435d3",
    storageBucket: "webchat-435d3.appspot.com",
    messagingSenderId: "286747567943",
    appId: "1:286747567943:web:d389aaeebcbb0c896c4e62",
    measurementId: "G-47ZJJ3RL3J",
  };
const appFireBase = initializeApp(firebaseConfig);
const storageFireBase = getStorage(appFireBase);

const initialState = storageFireBase;
function storageFireBaseReducer(state = initialState, action){
    return state;
}

export default storageFireBaseReducer;
export { storageFireBase }
