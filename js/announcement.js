import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore, collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// Initialize Firebase
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

    // Firestore database instance
    var db = getFirestore();

    // Retrieve data from Firestore
    var queryRef = query(collection(db, "announcement"), orderBy("created", "desc"));

    var announZcement = []; // Move the cards array declaration here

    getDocs(queryRef)
    .then(function(querySnapshot) {
      // Iterate through the documents
      querySnapshot.forEach(function(doc) {
        var data = doc.data();
        var announcementSlider = document.getElementById("announcementSlider");
  
        // Create a card element
        var announXcement = document.createElement("div");
        announXcement.className = "announXcement";
        announXcement.innerHTML = `
          <img src="${data.picture}" alt="announXcement Image">
          <h3>${data.title}</h3>
          <p>${data.description}</p>
          <a href="${data.link}" target="_blank">View Details</a>
        `;
  
        // Add the card reference to the cards array
        announZcement.push(announXcement);
  
        // Append the card to the card slider
        announcementSlider.appendChild(announXcement);
      });


    // Define variables for auto-slide functionality
    const slider = document.getElementById("announcementSlider");
    const slideDuration = 3000; // 1 second
    let currentIndex = 0;
    let animationPaused = false; // Flag to track animation pause state

    // Function to scroll to the next card
    function scrollToNextCard() {
        if (!animationPaused) {
            currentIndex = (currentIndex + 1) % announZcement.length;
            slider.scrollLeft = currentIndex * announZcement[0].offsetWidth;
        }
    }

    // Automatically scroll to the next card at regular intervals
    const slideInterval = setInterval(scrollToNextCard, slideDuration);

    // Pause animation on hover or touch
    const announcementContainer = document.querySelector(".announcement-container");

    // For desktop (mouse events)
    announcementContainer.addEventListener("mouseenter", () => {
        animationPaused = true;
    });

    announcementContainer.addEventListener("mouseleave", () => {
        animationPaused = false;
    });

    // For mobile (touch events)
    announcementContainer.addEventListener("touchstart", () => {
        animationPaused = true;
    });

    announcementContainer.addEventListener("touchend", () => {
        animationPaused = false;
    });

  }  
);