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
            let angle = Math.random() * Math.PI * 6;
            const speed = Math.random() * (0.1 - 0.04) + 0.04;
            const amplitude = Math.random() * (18 - 12) + 12;

            function animate() {
                angle += speed;
                const yOffset = Math.sin(angle) * amplitude;
                const xOffset = Math.cos(angle) * amplitude
                icon.style.transform = `translate(${yOffset}px, ${xOffset}px)`;

                const frameId = requestAnimationFrame(animate);
                animationFrames[index] = frameId;
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