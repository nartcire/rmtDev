import { DEFAULT_DISPLAY_TIME, errorEl, errorTextEl } from "../common.js";

const renderError = (message = "Something went wrong") => {
  errorTextEl.textContent = "Your search may not contain numbers";
  errorEl.classList.add("error--visible");
  setTimeout(
    () => errorEl.classList.remove("error--visible"),
    DEFAULT_DISPLAY_TIME
  );
};

export default renderError;
