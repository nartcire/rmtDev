import { BASE_API_URL, getData, jobDetailsContentEl } from "../common.js";

import renderJobDetails from "./JobDetails.js";
import renderSpinner from "./Spinner.js";

const loadHandler = async () => {
  // get the id from the URL
  const id = window.location.hash.substring(1);

  if (id) {
    // remove the previous job details content
    jobDetailsContentEl.innerHTML = "";

    // add spinner
    renderSpinner("job-details");

    try {
      // fetch job item data
      const data = await getData(`${BASE_API_URL}/jobs/${id}`);

      // extract job item
      const { jobItem } = data;

      // remove spinner
      renderSpinner("job-details");

      // render job details
      renderJobDetails(jobItem);
    } catch (error) {
      renderSpinner("job-details");
      renderError(error.message);
    }
  }
};

window.addEventListener("DOMContentLoaded", loadHandler);
window.addEventListener("hashchange", loadHandler);
