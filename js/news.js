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
    var queryRef = query(collection(db, "news"), orderBy("created", "desc"));

    var cardsm = []; // Move the cards array declaration here

    getDocs(queryRef)
      .then(function(querySnapshot) {
        // Iterate through the documents
        querySnapshot.forEach(function(doc) {
          var data = doc.data();
          var cardmSlider = document.getElementById("cardmSlider");

          // Create a card element
          var cardm = document.createElement("div");
          cardm.className = "cardm";
          cardm.innerHTML = `
            <img src="${data.picture}" alt="Cardm Image">
            <h3>${data.title}</h3>
            <p>${data.description}</p>
            <a href="${data.link}" target="_blank">View Details</a>
          `;

          // Add the card reference to the cards array
          cardsm.push(cardm);

          // Append the card to the card slider
          cardmSlider.appendChild(cardm);
        });

        // Add event listeners to pause and resume animation
        const cardmSlider = document.getElementById("cardmSlider");
        cardmSlider.addEventListener('mouseenter', pauseAnimations);
        cardmSlider.addEventListener('mouseleave', resumeAnimations);

        // Set scroll-snap-type for each card
        cardsm.forEach(function(cardm) {
          cardm.style.scrollSnapAlign = "start";
        });

        // Start auto sliding
        updateSliderPosition();
        startAutoSlide();
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });

    function pauseAnimations() {
      cardsm.forEach(function(cardm) {
        cardm.classList.add('paused');
      });
    }

    function resumeAnimations() {
      cardsm.forEach(function(cardm) {
        cardm.classList.remove('paused');
      });
    }

    // Auto slide variables
    let currentCardmIndex = 0;
    let autoSlideInterval = null;
    const slideIntervalDuration = 2000; // 1 seconds (adjust as needed)

    // Function to start auto sliding
    function startAutoSlide() {
      if (!autoSlideInterval) {
        autoSlideInterval = setInterval(() => {
          currentCardmIndex = (currentCardmIndex + 1) % cardsm.length;
          updateSliderPosition();
        }, slideIntervalDuration);
      }
    }

    // Function to stop auto sliding
    function stopAutoSlide() {
      if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
      }
    }

    // Function to update the slider position with smooth scroll transition
    function updateSliderPosition() {
      const cardmSlider = document.getElementById("cardmSlider");
      const cardmWidth = cardsm[0].offsetWidth;
      const targetScrollOffset = cardmWidth * currentCardmIndex;
      cardmSlider.style.scrollBehavior = "smooth"; // Use CSS smooth scrolling behavior
      cardmSlider.scrollLeft = targetScrollOffset;
    }

    // Add event listener to start auto sliding on DOMContentLoaded
    document.addEventListener('DOMContentLoaded', () => {
      updateSliderPosition();
      startAutoSlide();
    });

    // Add event listeners to pause and resume auto slide when the card slider is hovered
    const cardmSlider = document.getElementById("cardmSlider");
    cardmSlider.addEventListener('mouseenter', () => {
      stopAutoSlide();
    });
    cardmSlider.addEventListener('mouseleave', () => {
      startAutoSlide();
    });
