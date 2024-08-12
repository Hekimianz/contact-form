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
