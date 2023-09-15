import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore, collection, getDocs, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCM8SGcpuAb91X5pkK-S6HhXXtsakvhggQ",
    authDomain: "jibc-db.firebaseapp.com",
    projectId: "jibc-db",
    storageBucket: "jibc-db.appspot.com",
    messagingSenderId: "715748832720",
    appId: "1:715748832720:web:651fb692f3f4d17e8675d5",
    measurementId: "G-C0XMQPZCCG"
    };

initializeApp(firebaseConfig);

var db = getFirestore();
var cardsCarousel = document.getElementById("cards-carousel");
var dotIndicator = document.getElementById("dot-indicator");


// Retrieve data from Firestore and generate cards
getDocs(collection(db, "cards")).then((querySnapshot) => {
querySnapshot.forEach((doc, index) => {
  var data = doc.data();
  var card = createCard(data);
  cardsCarousel.appendChild(card);

  var dot = document.createElement("span");
  dot.classList.add("dot");
  dotIndicator.appendChild(dot);

  // Scroll to the card when the corresponding dot is clicked
  dot.addEventListener("click", function () {
    card.scrollIntoView({ behavior: "smooth", inline: "center" });
  });

  // Set the first card as active
  if (index === 0) {
    card.classList.add("active");
    dot.classList.add("active");
  }
});

// Retrieve the 'urutan' field value from the 'cards' document
const cardsDocRef = doc(db, "pengaturan", "cards");
getDoc(cardsDocRef).then((docSnapshot) => {
  if (docSnapshot.exists()) {
    const data = docSnapshot.data();
    const activeDotIndex = data.urutan || 0;

    // Use the activeDotIndex value as needed in your code

    // Add code to initialize the active dot based on activeDotIndex
    var activeCard = cardsCarousel.children[activeDotIndex];
    activeCard.scrollIntoView({ behavior: "smooth", inline: "center" });
    dots.forEach(function (dot) {
      dot.classList.remove("active");
    });
    dots[activeDotIndex].classList.add("active");
  }
});

// Observe changes in the carousel and update the active card and dot
var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    var card = entry.target;
    var dot = dotIndicator.children[Array.from(card.parentNode.children).indexOf(card)];

    if (entry.intersectionRatio > 0.8) {
      card.classList.add("active");
      dot.classList.add("active");
    } else {
      card.classList.remove("active");
      dot.classList.remove("active");
    }
  });
}, { threshold: 0.8 });

var cards = Array.from(cardsCarousel.children);
var dots = Array.from(dotIndicator.children);
var numCards = cards.length;
var numDots = 6; // Set the number of dots to 6 for mobile view
var cardsPerDot = Math.ceil(numCards / numDots);

// Hide all dots initially
dots.forEach(function (dot) {
  dot.style.display = "none";
});

// Show the first six dots
dots.slice(0, numDots).forEach(function (dot) {
  dot.style.display = "block";
});

// Update the active dot when the carousel scrolls
cardsCarousel.addEventListener("scroll", function () {
  var scrollLeft = cardsCarousel.scrollLeft;
  var activeCardIndex = Math.floor(scrollLeft / (cards[0].offsetWidth + 50));
  var activeDotIndex = Math.floor(activeCardIndex / cardsPerDot);

  // Update the active dot
  dots.forEach(function (dot) {
    dot.classList.remove("active");
  });
  dots[activeDotIndex % numDots].classList.add("active");
});

var isDragging = false;
var startPosX = 0;
var scrollLeftStart = 0;

// Handle touch events for mobile devices
cardsCarousel.addEventListener("touchstart", function (e) {
  isDragging = true;
  startPosX = e.touches[0].clientX;
  scrollLeftStart = cardsCarousel.scrollLeft;
});

cardsCarousel.addEventListener("touchend", function () {
  isDragging = false;
});

cardsCarousel.addEventListener("touchmove", function (e) {
  if (!isDragging) return;
  var touchX = e.touches[0].clientX;
  var distanceX = touchX - startPosX;
  cardsCarousel.scrollLeft = scrollLeftStart - distanceX;
});

// Handle mouse events for desktop devices
cardsCarousel.addEventListener("mousedown", function (e) {
  isDragging = true;
  startPosX = e.clientX;
  scrollLeftStart = cardsCarousel.scrollLeft;
  cardsCarousel.style.cursor = "grabbing";
});

cardsCarousel.addEventListener("mouseup", function () {
  isDragging = false;
  cardsCarousel.style.cursor = "grab";
});

cardsCarousel.addEventListener("mousemove", function (e) {
  if (!isDragging) return;
  var mouseX = e.clientX;
  var distanceX = mouseX - startPosX;
  cardsCarousel.scrollLeft = scrollLeftStart - distanceX;
});

Array.from(cardsCarousel.children).forEach(function (card) {
  observer.observe(card);
});
});

function createCard(data) {
var card = document.createElement("div");
card.classList.add("card");

var anchor = document.createElement("a"); // Create anchor tag
anchor.href = data.link || "#"; // Set the href attribute to the "link" field value
anchor.target = "_blank"; // Open link in a new tab

var image = document.createElement("img");
image.src = data.picture || ""; // Replace with the field name for the image
card.appendChild(image);

var column = document.createElement("div");
column.classList.add("column");

var title = document.createElement("h3");
title.textContent = data.title || ""; // Replace with the field name for the title
column.appendChild(title);

var dateTime = document.createElement("h5");
dateTime.textContent = data.date || ""; // Replace with the field names for day and date
column.appendChild(dateTime);

var time = document.createElement("h5");
time.textContent = data.description || ""; // Replace with the field name for the time
column.appendChild(time);

var theme = document.createElement("h4");
theme.textContent = '"' + data.details + '"' || ""; // Replace with the field name for the theme
column.appendChild(theme);

anchor.appendChild(column); // Append column to the anchor tag
card.appendChild(anchor); // Append anchor tag to the card

// Add click event listener to the card
card.addEventListener("click", function () {
  window.open(anchor.href, "_blank");
});

return card;
}