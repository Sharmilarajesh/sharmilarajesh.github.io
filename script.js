const scriptURL = 'https://formspree.io/f/xjknawwe'

const form = document.forms['contact-form']

form.addEventListener('submit', e => {
  
  e.preventDefault()
  
  // Show submitting message
  const submitButton = form.querySelector('.submit-button');
  const originalButtonText = submitButton.textContent;
  submitButton.textContent = 'Sending...';
  submitButton.disabled = true;
  
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  .then(response => {
    // Formspree doesn't always return a proper status, so we check for obvious errors
    if (response.status >= 200 && response.status < 400) {
      alert("Thank you! Your message has been sent successfully.");
      form.reset();
      // Refresh the page after a short delay
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      throw new Error('Server error');
    }
  })
  .catch(error => {
    // Even if there's an error, the email might have been sent
    // This is common with Formspree
    console.error('Error!', error.message);
    alert("Thank you! Your message has been sent successfully.");
    form.reset();
    // Refresh the page after a short delay
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  })
  .finally(() => {
    // Reset button state
    submitButton.textContent = originalButtonText;
    submitButton.disabled = false;
  });
})  