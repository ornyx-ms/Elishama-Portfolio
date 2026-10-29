
"use strict";

// 1. DOM selection
const menuToggle = document.querySelector("#menu-toggle");
const navLinks = document.querySelector("#nav-links");
const messageButton = document.querySelector("#message-button");
const dynamicMessage = document.querySelector("#dynamic-message");
const contactForm = document.querySelector("#contact-form");
const formFeedback = document.querySelector("#form-feedback");

// 2. Interactive navigation menu
menuToggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close the mobile menu after clicking a navigation link
navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        menuToggle.textContent = "☰";
    });
});

// 3. Function and conditional statement
let messageIndex = 0;

function updateMessage() {
    const messages = [
        "Welcome to my creative space.",
        "I combine technology with creativity.",
        "Every project is an opportunity to learn."
    ];

    if (messageIndex < messages.length - 1) {
        messageIndex++;
    } else {
        messageIndex = 0;
    }

    dynamicMessage.textContent = messages[messageIndex];
}

messageButton.addEventListener("click", updateMessage);

// 4. Contact form validation
contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const message = document.querySelector("#message").value.trim();

    // Reset previous feedback
    formFeedback.textContent = "";
    formFeedback.className = "";

    // Check required fields
    if (!name || !email || !message) {
        showFeedback("Please fill in all required fields.", "error");
        return;
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        showFeedback("Please enter a valid email address.", "error");
        return;
    }

    // Display confirmation when validation succeeds
    showFeedback(
        "Validation successful! Your message is ready. " +
        "This demo does not send emails yet.",
        "success"
    );

    contactForm.reset();
});

// 5. Reusable function for feedback messages
function showFeedback(message, type) {
    formFeedback.textContent = message;
    formFeedback.className = type;
}
