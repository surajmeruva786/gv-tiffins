document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.nav');
  
  if (mobileToggle) {
    mobileToggle.addEventListener('click', function() {
      nav.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    });
  }
  
  // Testimonial Slider
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.dot');
  let currentSlide = 0;
  
  function showSlide(n) {
    // Hide all slides
    testimonialSlides.forEach(slide => {
      slide.classList.remove('active');
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
      dot.classList.remove('active');
    });
    
    // Show the current slide and activate the corresponding dot
    testimonialSlides[n].classList.add('active');
    dots[n].classList.add('active');
  }
  
  // Add click event to dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });
  
  // Auto-advance slides
  if (testimonialSlides.length > 0) {
    setInterval(() => {
      currentSlide = (currentSlide + 1) % testimonialSlides.length;
      showSlide(currentSlide);
    }, 5000);
  }
  
  // Menu Filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const menuItems = document.querySelectorAll('.menu-card');
  const menuGroups = document.querySelectorAll('.menu-group');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => {
        btn.classList.remove('active');
      });
      
      // Add active class to clicked button
      button.classList.add('active');
      
      const category = button.getAttribute('data-category');
      
      if (category === 'all') {
        // Show all menu groups
        menuGroups.forEach(group => {
          group.style.display = 'block';
        });
      } else {
        // Show only the selected category and hide others
        menuGroups.forEach(group => {
          if (group.id === category) {
            group.style.display = 'block';
          } else {
            group.style.display = 'none';
          }
        });
      }
    });
  });
  
  // Contact Form Validation
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simple form validation
      let isValid = true;
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const message = document.getElementById('message');
      
      if (!name.value.trim()) {
        isValid = false;
        highlightError(name);
      } else {
        removeHighlight(name);
      }
      
      if (!email.value.trim() || !isValidEmail(email.value)) {
        isValid = false;
        highlightError(email);
      } else {
        removeHighlight(email);
      }
      
      if (!message.value.trim()) {
        isValid = false;
        highlightError(message);
      } else {
        removeHighlight(message);
      }
      
      if (isValid) {
        // In a real-world scenario, this would send the form data to a server
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
      }
    });
  }
  
  function highlightError(element) {
    element.style.borderColor = 'red';
  }
  
  function removeHighlight(element) {
    element.style.borderColor = '';
  }
  
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Initialize Map on Contact Page
  const mapElement = document.getElementById('restaurantMap');
  
  if (mapElement) {
    // Bangalore coordinates (for GV Tiffins)
    const restaurantLocation = [12.9716, 77.5946]; // Example coordinates
    
    // Initialize the map
    const map = L.map('restaurantMap').setView(restaurantLocation, 15);
    
    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);
    
    // Add a marker at the restaurant location
    const marker = L.marker(restaurantLocation).addTo(map);
    
    // Add a popup to the marker
    marker.bindPopup('<b>GV Tiffins & Restaurant</b><br>123 Temple Road, Gandhi Nagar<br>Bangalore - 560009').openPopup();
  }
});