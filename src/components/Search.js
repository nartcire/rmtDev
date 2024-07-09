import {
  BASE_API_URL,
  jobListSearchEl,
  numberEl,
  searchFormEl,
  searchInputEl,
} from "../common.js";

import renderError from "./Error.js";
import renderJobList from "./JobList.js";
import renderSpinner from "./Spinner.js";

const submitHandler = (event) => {
  // prevent default behavior
  event.preventDefault();

  // get search text
  const searchText = searchInputEl.value;

  // validation (regular expression example)
  const forbiddenPattern = /[0-9]/;
  const patternMatch = forbiddenPattern.test(searchText);

  if (patternMatch) {
    renderError("Your search may not contain numbers");
    return;
  }

  // blur input
  searchInputEl.blur();

  // remove previous job items
  jobListSearchEl.innerHTML = "";

  // render spinner
  renderSpinner("search");

  // fetch search results
  fetch(`${BASE_API_URL}/jobs?search=${searchText}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          "Resource issue (e.g. reosurce doesn't exist) or server issue"
        );
      }

      return response.json();
    })
    .then((data) => {
      // extract the job items
      const { jobItems } = data;

      // remove the spinner
      renderSpinner("search");

      // render the number of results
      numberEl.textContent = jobItems.length;

      // render job items in search job list
      renderJobList(jobItems);
    })
    .catch((error) => {
      renderSpinner("search");
      renderError(error.message);
    });
};

searchFormEl.addEventListener("submit", submitHandler);
