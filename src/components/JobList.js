import {
  BASE_API_URL,
  RESULTS_PER_PAGE,
  getData,
  jobDetailsContentEl,
  jobListSearchEl,
  state,
} from "../common.js";

import renderError from "./Error.js";
import renderJobDetails from "./JobDetails.js";
import renderSpinner from "./Spinner.js";

const renderJobList = () => {
  // remove previous job items
  jobListSearchEl.innerHTML = "";

  state.searchJobItems
    .slice(
      state.currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
      state.currentPage * RESULTS_PER_PAGE
    )
    .forEach((jobItem) => {
      const newJobItemHTML = `
        <li class="job-item">
            <a class="job-item__link" href="${jobItem.id}">
                <div class="job-item__badge">${jobItem.badgeLetters}</div>
                <div class="job-item__middle">
                    <h3 class="third-heading">${jobItem.title}</h3>
                    <p class="job-item__company">${jobItem.company}</p>
                    <div class="job-item__extras">
                        <p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i>${jobItem.duration}</p>
                        <p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i>${jobItem.salery}</p>
                        <p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i>"${jobItem.location}</p>
                    </div>
                </div>
                <div class="job-item__right">
                    <i class="fa-solid fa-bookmark job-item__bookmark-icon"></i>
                    <time class="job-item__time">${jobItem.daysAgo}</time>
                </div>
            </a>
        </li>
      `;
      jobListSearchEl.insertAdjacentHTML("beforeend", newJobItemHTML);
    });
};

const clickHandler = async (event) => {
  // prevent default behavior
  event.preventDefault();

  // get clicked job item element
  const jobItemEl = event.target.closest(".job-item");

  // remove active class from previously active job class
  document
    .querySelector(".job-item--active")
    ?.classList.remove("job-item--active");

  // add active class
  jobItemEl.classList.add("job-item--active");

  // empty the job details section
  jobDetailsContentEl.innerHTML = "";

  // render spinner
  renderSpinner("job-details");

  // get the id
  const id = jobItemEl.children[0].getAttribute("href");

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
};

jobListSearchEl.addEventListener("click", clickHandler);

export default renderJobList;
