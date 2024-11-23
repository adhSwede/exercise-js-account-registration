// ===========================================================
//        exercise-js-account registration
// ===========================================================

// =========== // References // ===========
// Broad inputs
const inputForm = document.querySelector(".input-form");
const inputLabels = document.querySelectorAll(".input-form > label");
const inputFields = document.querySelectorAll(".input-form > input");
// Narrow inputs
const nameInput = document.querySelector(".name-input");
const userInput = document.querySelector(".user-input");
const emailInput = document.querySelector(".email-input");
const passInput = document.querySelector(".pass1-input");
const passConfirm = document.querySelector(".pass2-input");
// Submit Button
const submitBtn = document.querySelector(".submit-btn");

// =========== // Logic // ===========
// ---------- Focus Input ----------
// Function: Click label to focus input.
const focusInput = (event) => {
  // Target the element invoking the event.
  const nextInput = event.target.nextElementSibling; // target the next sibling in the NodeList.
  if (nextInput) {
    nextInput.focus(); // Focus the element.
  }
};

// Add an onclick event to all Labels calling the `focusInput`-function.
inputLabels.forEach((label) => {
  label.addEventListener("click", focusInput);
});

// ---------- Disable Submit: all fields ----------
// Function: Check if all inputs have values
const checkInputValue = () => {
  return [...inputFields].every((input) => input.value.trim() !== ""); // Check if all inputs have values.
};

// Enable submit button only if all fields are filled, password is valid, and passwords match
inputFields.forEach((input) => {
  input.addEventListener("input", () => {
    const allFilled = checkInputValue();
    const isPasswordValid = passInput.value.trim().length >= 7;
    const arePasswordsAlike = passConfirm.value === passInput.value;

    // (had to refactor this a few times for bugs that arose from adding functionality.)
    if (allFilled && isPasswordValid && arePasswordsAlike) {
      submitBtn.disabled = false;
    } else {
      submitBtn.disabled = true;
    }
  });
});

// ---------- Password Input Validation Feedback ----------
passInput.addEventListener("input", () => {
  const isPasswordValid = passInput.value.trim().length >= 7;

  // Handle border styling based on password validity
  if (isPasswordValid) {
    passInput.classList.remove("red-border");
    passInput.classList.add("green-border");
  } else {
    passInput.classList.remove("green-border");
    passInput.classList.add("red-border");
  }
});

// ---------- Password Confirmation Feedback ----------
passConfirm.addEventListener("input", () => {
  const arePasswordsAlike = passConfirm.value === passInput.value;
  const isPasswordValid = passInput.value.trim().length >= 7;

  // Ensure both passwords are valid and match
  if (arePasswordsAlike && isPasswordValid) {
    passConfirm.classList.remove("red-border");
    passConfirm.classList.add("green-border");
  } else {
    passConfirm.classList.remove("green-border");
    passConfirm.classList.add("red-border");
  }
});

// ---------- Submit Event Alert ----------
const submitAlert = (event) => {
  event.preventDefault();

  const subInfo = {
    name: nameInput.value,
    username: userInput.value,
    email: emailInput.value,
    password: passInput.value,
  };

  // Show alert with the values
  alert(
    `Name: ${subInfo.name}\nUsername: ${subInfo.username}\nEmail: ${subInfo.email}\nPassword: ${subInfo.password}`
  );
};

inputForm.addEventListener("submit", submitAlert);
