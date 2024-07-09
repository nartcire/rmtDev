import { errorEl, errorTextEl } from "../common.js";

const renderError = (message = "Something went wrong") => {
  errorTextEl.textContent = "Your search may not contain numbers";
  errorEl.classList.add("error--visible");
  setTimeout(() => errorEl.classList.remove("error--visible"), 3500);
};

export default renderError;
