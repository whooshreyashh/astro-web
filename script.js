// Navbar toggle for mobile
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});


document.addEventListener("DOMContentLoaded", function () {
  const output = document.getElementById("horoscope-preview");
  const meta = document.getElementById("horoscope-meta");

  fetch("https://script.google.com/macros/s/AKfycbxNpJHaoj5dSWG-bsmGxyzvX0wTNZ3BxRKfbMEQOImVVW5OQ-yXfIzMqtL-XbIFZVdL/exec")
    .then(res => res.json())
    .then(data => {
      if (Array.isArray(data) && data.length > 0) {
        data.sort((a, b) => new Date(b.date) - new Date(a.date));
        const latest = data[0];

        output.innerText = latest.horoscope || "No horoscope available.";
        
        // Optional: include zodiac target & formatted date
        const target = latest.zodiac || "Universal";
        const date = new Date(latest.date).toLocaleDateString("en-IN", {
          day: "numeric", month: "long", year: "numeric"
        });

        meta.innerText = `For: ${target} | Updated on: ${date}`;
      } else {
        output.innerText = "No horoscope available.";
        meta.innerText = "";
      }
    })
    .catch(err => {
      console.error("Error fetching horoscope:", err);
      output.innerText = "Failed to load horoscope.";
      meta.innerText = "";
    });
});

const descriptions = [
  "Today’s horoscope as shared by our astrologer.",
  "This is today’s universal horoscope message, shared by our astrologer for all zodiac signs.",
  "A guiding message from the stars, lovingly shared by our astrologer.",
  "A daily insight chosen by our astrologer.",
  "As per today’s celestial alignment, this message has been chosen for all seekers of wisdom."
];

const descTarget = document.getElementById("horoscope-description");
descTarget.innerText = descriptions[Math.floor(Math.random() * descriptions.length)];



/* Stars trails */
/* document.addEventListener("DOMContentLoaded", () => {
  const starContainer = document.getElementById("starContainer");

  function createStar() {
    const star = document.createElement("span");
    star.classList.add("star");

    const top = Math.random() * -50;
    const right = Math.random() * window.innerWidth;
    const size = Math.random() * 4 + 3;
    const duration = Math.random() * 2 + 1;

    star.style.top = `${top}px`;
    star.style.right = `${right}px`;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.animationDuration = `${duration}s`;

    starContainer.appendChild(star);

    setTimeout(() => {
      if (star && star.parentNode) {
        star.remove();
      }
    }, duration * 1000 + 500);
  }

  setInterval(createStar, 100);
}); */


