
// JavaScript code to morph between texts
const texts = [" Web Developer ", "   Python Developer ", "   Java Developer "]; // Array of texts to morph between
const morphTime = 5000; // Time for morphing in milliseconds (increased for slower animation)
const cooldownTime = 500; // Cooldown time in milliseconds
let textIndex = texts.length - 1;
let time = new Date();
let morph;
let cooldown = cooldownTime;

const elts = {
    text1: document.querySelector(".name"),
    text2: document.createElement("span"),
};

// Append text2 element to the container
elts.text1.parentElement && elts.text1.parentElement.insertBefore(elts.text2, elts.text1.nextSibling);

// Function to morph between texts
function setText(index) {
    const text = texts[index];
    const len = text.length;
    elts.text1.textContent = elts.text2.textContent = "";

    for (let i = 0; i < len; i++) {
        const node = document.createElement("span");
        node.textContent = text.charAt(i);
        elts.text1.appendChild(node);
    }

    // Reset animation
    elts.text2.style.width = len > 0 ? len * 8 + "px" : "auto";
    clearTimeout(morph);
    clearTimeout(cooldown);
    elts.text1.style.transition = elts.text2.style.transition = "";
    elts.text1.offsetHeight; /* trigger reflow */
    elts.text1.style.transition = elts.text2.style.transition = "width " + morphTime + "ms linear";
    elts.text2.style.width = len * 8 + "px";
}

// Function to handle morphing between texts
function doMorph() {
    const currentTime = new Date();
    const dt = currentTime - time;
    time = currentTime;
    cooldown -= dt;

    if (cooldown <= 0) {
        cooldown = cooldownTime;
        clearTimeout(morph);
        setText(textIndex);
        textIndex = (textIndex + 1) % texts.length;
        morph = setTimeout(doMorph, morphTime);
    } else {
        morph = setTimeout(doMorph, cooldown);
    }
}

// Call the doMorph function to start the animation
doMorph();



document.getElementById('theme-toggle').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    this.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
});

function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // Show the selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }
}

// Optional: Automatically show the 'home' section on page load
document.addEventListener('DOMContentLoaded', () => {
    showSection('home');
});
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // Show the selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }
}

// Optional: Automatically show the 'home' section on page load
document.addEventListener('DOMContentLoaded', () => {
    showSection('home');
});

var closeButton = document.getElementsByClassName("close-button")[0];
closeButton.onclick = function () {
    window.location.href = "http://localhost/port/portfolio.html";
}




