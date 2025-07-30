
document.addEventListener('DOMContentLoaded', function () {
  // Certification form
  const certForm = document.getElementById('cert-form');
  const certFileInput = document.getElementById('cert-file');
  const certPreview = document.getElementById('cert-preview');

  if (certForm && certFileInput && certPreview) {
    certForm.addEventListener('submit', function (e) {
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
        reader.onload = function (event) {
          const img = document.createElement('img');
          img.src = event.target.result;
          img.alt = 'Certificate Preview';
          certPreview.appendChild(img);
        };
        reader.readAsDataURL(file);
      } else if (fileType === 'application/pdf') {
        const para = document.createElement('p');
        para.textContent = 'Uploaded: ${file.name} (PDF preview not supported)';
        certPreview.appendChild(para);
      } else {
        alert('Unsupported file type. Please upload an image or PDF.');
      }
    });
  }

  // Contact form
  const contactForm = document.getElementById('contact-form');
  const responseMsg = document.getElementById('form-response');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  if (contactForm && responseMsg && nameInput && emailInput && messageInput) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const message = messageInput.value.trim();

      if (name && email && message) {
        responseMsg.textContent = "Thanks for your message!";
        responseMsg.style.color = "green";
        contactForm.reset();
      } else {
        responseMsg.textContent = "Please fill out all fields.";
        responseMsg.style.color = "red";
      }
    });
  }
});
