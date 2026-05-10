document.addEventListener("DOMContentLoaded", () => {
  // Initialize the Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // Check if the element has entered the viewport
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        
        // Stop observing the element so the animation only happens once
        observer.unobserve(entry.target);
      }
    });
  }, {
    // Animation triggers when 10% of the element is visible
    threshold: 0.1, 
    // Trigger the animation 50px before the element is fully in view
    rootMargin: "0px 0px -50px 0px"
  });

  // Find all elements with the animation class and observe them
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach((el) => observer.observe(el));
});