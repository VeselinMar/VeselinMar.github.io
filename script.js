// menu expand function
function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open")
    icon.classList.toggle("open")
}

// shuffling icons function

function iconShuffle(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return; // Ensure container exists
    const icons = container.querySelectorAll(".icon");
    let animationFrames = [];

    function startAnimation() {
    icons.forEach((icon, index) => {
        let angle = Math.random() * Math.PI * 2; // Random starting angle
        const speed = 0.01 + Math.random() * 0.03; // Slightly different speeds for each icon
        const radius = Math.random() * (12 - 8) + 8; // Orbit size variation
        const waveAmplitude = Math.random() * (15 - 10) + 10; // Left-right sway range

        function animate() {
            angle += speed;

            const xOffset = Math.cos(angle) * radius + Math.sin(angle * 1.5) * waveAmplitude; // Orbit + Wave
            const yOffset = Math.sin(angle) * radius; // Circular motion

            icon.style.transform = `translate(${xOffset}px, ${yOffset}px)`;

            animationFrames[index] = requestAnimationFrame(animate);
        }

        animate();
    });
}


    function stopAnimation() {
        animationFrames.forEach(frameId => cancelAnimationFrame(frameId));
        animationFrames = []; // Clear stored frames
        icons.forEach(icon => {
            icon.style.transition = "transform 0.3s ease-out";
            icon.style.transform = "translateY(0)"; // Reset position
        });
    }

    container.addEventListener("mouseenter", startAnimation);
    container.addEventListener("mouseleave", stopAnimation);
}


document.addEventListener("DOMContentLoaded", function () {
    iconShuffle(".shuffle-icons"); // Apply only to specific containers
});