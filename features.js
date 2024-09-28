// Initialize AOS animations
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1800,  // Extended duration for smoother transitions
        once: true,      // Animation should occur only once
        easing: 'ease-in-out-back', // Easing function for engaging animations
        offset: 120,     // Adjust offset for better animation timing
        delay: 200,      // Slight delay for a cascading effect
    });
});
