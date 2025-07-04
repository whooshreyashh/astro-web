// Navbar toggle for mobile
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");
  const output = document.getElementById("horoscope-preview");
  const meta = document.getElementById("horoscope-meta");
  const descTarget = document.getElementById("horoscope-description");
  const readMoreBtn = document.getElementById("read-more-btn");
  const modal = document.getElementById("horoscope-modal");
  const modalText = document.getElementById("full-horoscope-text");
  const closeBtn = document.querySelector(".close-btn");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  const descriptions = [
    "Today’s horoscope as shared by our astrologer.",
    "This is today’s universal horoscope message, shared by our astrologer for all zodiac signs.",
    "A guiding message from the stars, lovingly shared by our astrologer.",
    "A daily insight chosen by our astrologer.",
    "As per today’s celestial alignment, this message has been chosen for all seekers of wisdom."
  ];

  descTarget.innerText = descriptions[Math.floor(Math.random() * descriptions.length)];

  fetch("https://script.google.com/macros/s/AKfycbxNpJHaoj5dSWG-bsmGxyzvX0wTNZ3BxRKfbMEQOImVVW5OQ-yXfIzMqtL-XbIFZVdL/exec")
    .then(res => res.json())
    .then(data => {
      if (Array.isArray(data) && data.length > 0) {
        data.sort((a, b) => new Date(b.date) - new Date(a.date));
        const latest = data[0];
        const fullText = latest.horoscope || "No horoscope available.";

        output.innerText = fullText;
        modalText.innerText = fullText;

        const target = latest.zodiac || "Universal";
        const date = new Date(latest.date).toLocaleDateString("en-IN", {
          day: "numeric", month: "long", year: "numeric"
        });

        meta.innerText = `For: ${target} | Updated on: ${date}`;

        // Show "Read More" button if long
        if (fullText.length > 250) {
          readMoreBtn.style.display = "inline-block";
        } else {
          readMoreBtn.style.display = "none";
        }
      } else {
        output.innerText = "No horoscope available.";
        modalText.innerText = "";
        meta.innerText = "";
      }
    })
    .catch(err => {
      console.error("Error fetching horoscope:", err);
      output.innerText = "Failed to load horoscope.";
      meta.innerText = "";
    });

  // Modal logic
  readMoreBtn.addEventListener("click", () => {
    modal.style.display = "block";
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});



// TEXTBOX ANIMATION
const textBoxes = document.querySelectorAll('.text-box');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

textBoxes.forEach(box => observer.observe(box));








// NAVBAR SCROLL HIDE
let lastScrollTop = 0;
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", function () {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    // Scrolling down – hide navbar
    navbar.style.top = "-100px"; // Adjust if your header height is different
  } else {
    // Scrolling up – show navbar
    navbar.style.top = "0";
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});
