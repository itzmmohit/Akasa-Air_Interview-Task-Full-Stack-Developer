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
  const first = document.getElementById('firstName').value.trim();
  const last = document.getElementById('lastName').value.trim();
  const email = document.getElementById('emailSignup').value.trim();
  const password = document.getElementById('passwordSignup').value.trim();

  // // Validation checks
  // const emailIsValid = validateEmail(email);
  // const passwordIsValid = validatePassword(password);
  // const firstNameIsValid = validateName(first);
  // const lastNameIsValid = validateName(last);

  // if (!emailIsValid || !passwordIsValid || !firstNameIsValid || !lastNameIsValid) {
  //   alert("Please fill in all the fields correctly.");
  //   return; // Do not proceed with registration if any validation fails
  // }

  const data = { first, email, password, last };

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
      alert("Registerd Succesfully.");
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
