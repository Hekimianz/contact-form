const nameInputs = document.querySelectorAll("input[type='text']");
const textArea = document.querySelector("textarea");
const emailInput = document.querySelector("input[type='email']");
const radioBtns = document.querySelectorAll("input[type='radio']");
const consentBox = document.querySelector("input[type='checkbox']");
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const isConsentValid = handleInputs(consentBox);
  const isName1Valid = handleInputs(nameInputs[0]);
  const isName2Valid = handleInputs(nameInputs[1]);
  const isEmailValid = handleInputs(emailInput);
  const isTextAreaValid = handleInputs(textArea);
  const isRadioValid = handleInputs(radioBtns[0]);

  // Call handleSubmit only if all inputs are valid
  if (
    isConsentValid &&
    isName1Valid &&
    isName2Valid &&
    isEmailValid &&
    isTextAreaValid &&
    isRadioValid
  ) {
    handleSubmit();
  }
});

document
  .querySelectorAll(".radio__input label, .checkbox__input label")
  .forEach((label) => {
    label.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        const input = document.querySelector(`#${label.getAttribute("for")}`);
        if (input) {
          input.click(); // Toggle the hidden input
        }
      }
    });

    // Sync aria-checked attribute with input state
    const input = document.querySelector(`#${label.getAttribute("for")}`);
    if (input) {
      input.addEventListener("change", () => {
        label.setAttribute("aria-checked", input.checked ? "true" : "false");
      });
      // Initial state sync
      label.setAttribute("aria-checked", input.checked ? "true" : "false");
    }
  });

function handleInputs(input) {
  let errorSpan = input.parentElement.querySelector(".error__message");

  if (input === radioBtns[0] || input === radioBtns[1]) {
    errorSpan = document.querySelector("#queryError");
  } else if (input === consentBox) {
    errorSpan = document.querySelector("#consentError");
  }

  // Names and TextArea
  if (
    (input === nameInputs[0] ||
      input === nameInputs[1] ||
      input === textArea) &&
    !input.value
  ) {
    if (errorSpan) errorSpan.classList.remove("hidden");
    return false;
  }

  // Email
  if (input === emailInput && !isValidEmail(input.value)) {
    if (errorSpan) errorSpan.classList.remove("hidden");
    return false;
  }

  // Radio Buttons
  if (
    input === radioBtns[0] &&
    ![...radioBtns].some((radio) => radio.checked)
  ) {
    if (errorSpan) errorSpan.classList.remove("hidden");
    return false;
  }

  // Checkbox
  if (input === consentBox && !consentBox.checked) {
    if (errorSpan) errorSpan.classList.remove("hidden");
    return false;
  }

  // If no validation errors
  if (errorSpan) errorSpan.classList.add("hidden");
  return true;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function handleSubmit() {
  // Make the success div visible and trigger the animation
  const successDiv = document.querySelector(".success");
  successDiv.classList.add("show");

  // Automatically hide the success div after the animation completes
  setTimeout(() => {
    successDiv.classList.remove("show");
  }, 5000); // 3 seconds = 3000 milliseconds

  form.reset();
}
