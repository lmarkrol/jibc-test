import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const firebaseConfig = {
apiKey: "AIzaSyCM8SGcpuAb91X5pkK-S6HhXXtsakvhggQ",
authDomain: "jibc-db.firebaseapp.com",
projectId: "jibc-db",
storageBucket: "jibc-db.appspot.com",
messagingSenderId: "715748832720",
appId: "1:715748832720:web:651fb692f3f4d17e8675d5",
measurementId: "G-C0XMQPZCCG"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const openingImageContainer = document.querySelector(".opening-image");
const openingTextContainer = document.querySelector(".opening-text");

async function fetchOpeningData() {
  try {
    const querySnapshot = await getDocs(collection(db, "opening"));

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const image = document.createElement("img");
      image.src = data.image;
      image.alt = "Opening Image";
      openingImageContainer.appendChild(image);

      const description = document.createElement("div");
      description.innerHTML = data.description;
      openingTextContainer.appendChild(description);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchOpeningData();