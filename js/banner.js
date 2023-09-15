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
const bannerContainer = document.querySelector(".slideshow-container");
const dotContainer = document.querySelector(".dot-container");

async function fetchBannerData() {
  const querySnapshot = await getDocs(collection(db, "banner"));

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const image = document.createElement("img");
    image.src = data.picture;
    image.alt = "Banner Image";
    image.addEventListener("click", () => {
      // window.open(data.link, "_blank"); BANNER CLICK OPEN NEW TAB IS DISABLE
    });
    bannerContainer.appendChild(image);

    const dot = document.createElement("span");
    dot.classList.add("dot");
    dotContainer.appendChild(dot);

    dot.addEventListener("click", () => {
      showBannerImage(dot);
    });
  });

  const images = document.querySelectorAll(".slideshow-container img");
  const dots = document.querySelectorAll(".dot-container .dot");
  images[0].classList.add("active");
  dots[0].classList.add("active");
  setInterval(showNextImage, 3000);
}


function showBannerImage(dot) {
  const dots = document.querySelectorAll(".dot-container .dot");
  const images = document.querySelectorAll(".slideshow-container img");

  dots.forEach((dotItem, index) => {
    if (dot === dotItem) {
      dotItem.classList.add("active");
      images[index].classList.add("active");
    } else {
      dotItem.classList.remove("active");
      images[index].classList.remove("active");
    }
  });
}

function showNextImage() {
  const dots = document.querySelectorAll(".dot-container .dot");
  const images = document.querySelectorAll(".slideshow-container img");

  let currentIndex = -1;
  images.forEach((image, index) => {
    if (image.classList.contains("active")) {
      currentIndex = index;
      image.classList.remove("active");
      dots[index].classList.remove("active");
    }
  });

  if (currentIndex !== -1) {
    const nextIndex = (currentIndex + 1) % images.length;
    images[nextIndex].classList.add("active");
    dots[nextIndex].classList.add("active");
  }
}

fetchBannerData();