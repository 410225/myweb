// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
  // Mobile Navigation Toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (hamburger) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }
  
  // Close mobile menu when clicking on a link
  const navItems = document.querySelectorAll('.nav-links a');
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
  
  // Animate skill bars on scroll
  const skillBars = document.querySelectorAll('.skill-progress');
  
  if (skillBars.length > 0) {
    const animateSkillBars = () => {
      skillBars.forEach(bar => {
        const barPosition = bar.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (barPosition < screenPosition) {
          const width = bar.getAttribute('data-width');
          bar.style.width = width + '%';
        }
      });
    };
    
    // Initial check
    animateSkillBars();
    
    // Check on scroll
    window.addEventListener('scroll', animateSkillBars);
  }
  
  // Form handling
  const contactForm = document.getElementById('contact-form');
  const responseMsg = document.getElementById('form-response');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      
      if (name && email && message) {
        responseMsg.textContent = "Thank you for your message! I'll get back to you soon.";
        responseMsg.style.color = "green";
        contactForm.reset();
        
        // Clear message after 5 seconds
        setTimeout(() => {
          responseMsg.textContent = "";
        }, 5000);
      } else {
        responseMsg.textContent = "Please fill out all fields.";
        responseMsg.style.color = "red";
      }
    });
  }
  
  // Header scroll effect
  const header = document.querySelector('header');
  
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
      } else {
        header.style.background = 'var(--white)';
        header.style.backdropFilter = 'none';
      }
    });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Certification form handling (if exists on certifications page)
  const certForm = document.getElementById('cert-form');
  const certFileInput = document.getElementById('cert-file');
  const certPreview = document.getElementById('cert-preview');
  
  if (certForm && certFileInput && certPreview) {
    certForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const file = certFileInput.files[0];
      certPreview.innerHTML = '';
      
      if (!file) {
        alert('Please select a file to upload.');
        return;
      }
      
      const fileType = file.type;
      const reader = new FileReader();
      
      if (fileType.startsWith('image/')) {
        reader.onload = function(event) {
          const img = document.createElement('img');
          img.src = event.target.result;
          img.alt = 'Certificate Preview';
          img.style.maxWidth = '100%';
          certPreview.appendChild(img);
        };
        reader.readAsDataURL(file);
      } else if (fileType === 'application/pdf') {
        const para = document.createElement('p');
        para.textContent = `Uploaded: ${file.name} (PDF preview not supported)`;
        certPreview.appendChild(para);
      } else {
        alert('Unsupported file type. Please upload an image or PDF.');
      }
    });
  }
  
  // Add animation to elements when they come into view
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.project-card, .certification-item, .project-detail, .certification-card');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;
      
      if (elementPosition < screenPosition) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };
  
  // Set initial state for animated elements
  const animatedElements = document.querySelectorAll('.project-card, .certification-item, .project-detail, .certification-card');
  animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  
  // Check animation on load and scroll
  window.addEventListener('load', animateOnScroll);
  window.addEventListener('scroll', animateOnScroll);
  
  // Add loading animation
  window.addEventListener('load', function() {
    document.body.classList.add('loaded');
  });
});

// Add some CSS for the loading state
const style = document.createElement('style');
style.textContent = `
  body:not(.loaded) {
    overflow: hidden;
  }
  
  body:not(.loaded)::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--white);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  body:not(.loaded)::after {
    content: 'Loading...';
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10000;
    font-size: 1.5rem;
    color: var(--primary);
  }
`;
document.head.appendChild(style);
