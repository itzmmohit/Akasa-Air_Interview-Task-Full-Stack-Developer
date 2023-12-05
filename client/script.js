document.addEventListener("DOMContentLoaded", function () {
  console.log('Script loaded successfully');

  const body = document.querySelector("body");
  const modal = document.querySelector(".modal");
  const modalButton = document.querySelector(".modal-button, .header-right");
  const closeButton = document.querySelector(".close-button");
  const scrollDown = document.querySelector(".scroll-down");
  let isOpened = false;

  const openModal = () => {
    modal.classList.add("is-open");
    body.style.overflow = "hidden";
  };

  const closeModal = () => {
    modal.classList.remove("is-open");
    body.style.overflow = "initial";
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > window.innerHeight / 3 && !isOpened) {
      isOpened = true;
      scrollDown.style.display = "none";
      openModal();
    } else if (window.scrollY <= window.innerHeight / 3 && isOpened) {
      isOpened = false;
      scrollDown.style.display = "block";
      closeModal();
    }
  });

  modalButton.addEventListener("click", openModal);
  closeButton.addEventListener("click", closeModal);

  document.addEventListener("keydown", (evt) => {
    evt = evt || window.event;
    if (evt.keyCode === 27) {
      closeModal();
    }
  });

  const registerButton = document.getElementById('registerButton');

  // Attach event listeners to the register button
  registerButton.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent the default form submission
    handleRegister();
  });

  const emailInput = document.getElementById('emailSignup');
  const passwordInput = document.getElementById('passwordSignup');
  const firstNameInput = document.getElementById('firstName');
  const lastNameInput = document.getElementById('lastName');

  const passwordInfoIcon = document.getElementById('password-info-icon');

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password) => {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
  };

  const validateName = (name) => {
    return /^[A-Za-z]+$/.test(name);
  };

  const updateRegisterButtonState = () => {
    const emailIsValid = validateEmail(emailInput.value);
    const passwordIsValid = validatePassword(passwordInput.value);
    const firstNameIsValid = validateName(firstNameInput.value);
    const lastNameIsValid = validateName(lastNameInput.value);

    const allInputsAreValid = emailIsValid && passwordIsValid && firstNameIsValid && lastNameIsValid;
    registerButton.disabled = !allInputsAreValid;
  };

  const validateAndHighlight = (input, validator) => {
    const isValid = validator(input.value);
    highlightValidity(input, isValid);
  };

  const highlightValidity = (element, isValid) => {
    element.classList.toggle('valid', isValid);
    element.classList.toggle('invalid', !isValid);
  };

  if (emailInput) {
    emailInput.addEventListener('input', function () {
      validateAndHighlight(this, validateEmail);
      updateRegisterButtonState();
    });
  }

  if (passwordInput) {
    passwordInput.addEventListener('input', function () {
      validateAndHighlight(this, validatePassword);
      updateRegisterButtonState();

      const passwordRequirements = "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one digit.";

      if (this.value.length === 0) {
        passwordInfoIcon.innerHTML = "ℹ️"; // Info icon
      } else if (!isValid) {
        passwordInfoIcon.innerHTML = "❌"; // Cross icon
      } else {
        passwordInfoIcon.innerHTML = "✅"; // Checkmark icon
      }

      if (this.value.length > 0) {
        alert(passwordRequirements);
      }
    });
  }

  if (firstNameInput) {
    firstNameInput.addEventListener('input', function () {
      validateAndHighlight(this, validateName);
      updateRegisterButtonState();
    });
  }

  if (lastNameInput) {
    lastNameInput.addEventListener('input', function () {
      validateAndHighlight(this, validateName);
      updateRegisterButtonState();
    });
  }

  updateRegisterButtonState(); // Initial state check
});

function toggleModal(state) {
  const loginContent = document.getElementById('login-content');
  const loginImage = document.getElementById('login-image');
  const signupContent = document.getElementById('signup-content');

  if (state === 'signup') {
    loginContent.style.display = 'none';
    loginImage.style.display = 'none';
    signupContent.style.display = 'block';
  } else {
    loginContent.style.display = 'block';
    loginImage.style.display = 'block';
    signupContent.style.display = 'none';
  }
}

// Function to handle the register button click
async function handleRegister() {
  const first = document.getElementById('firstName').value;
  const last = document.getElementById('lastName').value;
  const email = document.getElementById('emailSignup').value;
  const password = document.getElementById('passwordSignup').value;

  // Validation checks
  const emailIsValid = validateEmail(email);
  const passwordIsValid = validatePassword(password);
  const firstNameIsValid = validateName(first);
  const lastNameIsValid = validateName(last);

  if (!emailIsValid || !passwordIsValid || !firstNameIsValid || !lastNameIsValid) {
    alert("Please fill in all the fields correctly.");
    return; // Do not proceed with registration if any validation fails
  }

  const data = { first, last, email, password };

  try {
    const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      console.log('User registered successfully');
      window.location.href = "main.html";
      // Add your logic here for successful registration
    } else {
      console.error('Error registering user');
      // Add your error handling logic here
    }
  } catch (error) {
    console.error('Error registering user', error);
    // Add your error handling logic here
  }
}

// Function to handle the login button click
function handleLogin() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const data = { email, password };

  fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (response.ok) {
        console.log('User logged in successfully');
        window.location.href = "main.html";
        // Add your logic here for successful login
      } else {
        console.error('Error logging in');
        // Add your error handling logic here
      }
    })
    .catch(error => {
      console.error('Error logging in', error);
      // Add your error handling logic here
    });
}

// Attach event listeners to the register and login buttons
const registerButton = document.getElementById('registerButton');
registerButton.addEventListener('click', handleRegister);

const loginButton = document.getElementById('loginButton');
loginButton.addEventListener('click', handleLogin);

// For validating stufff-------------------------

function validateAndHighlight(input, validator) {
  const isValid = validator(input.value);
  highlightValidity(input, isValid);
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return passwordRegex.test(password);
}

function validateName(name) {
  const nameRegex = /^[a-zA-Z]+$/;
  return nameRegex.test(name);
}

function highlightValidity(element, isValid) {
  element.classList.toggle('valid', isValid);
  element.classList.toggle('invalid', !isValid);
}

  //for password

  function sendPasswordResetEmail() {
    const forgotEmail = document.getElementById('forgotEmail').value;
  
    // Perform the logic to send a password reset email
    // You can use AJAX to send a request to your server to handle the email sending
    // For simplicity, let's assume the server returns a success message
    const resetEmailSent = true;
  
    if (resetEmailSent) {
      alert('Password reset email sent successfully. Check your email.');
      toggleModal('forgotPassword'); // Close the modal after sending the email
    } else {
      alert('Error sending password reset email. Please try again.');
    }
  }