import {
  sortingBtnRecentEl,
  sortingBtnRelevantEl,
  sortingEl,
  state,
} from "../common.js";

import renderJobList from "./JobList.js";
import renderPaginationButtons from "./Pagination.js";

const clickHandler = (event) => {
  // get clicked element
  const clickedButtonEl = event.target.closest(".sorting__button");

  // stop function if no clicked button element
  if (!clickedButtonEl) return;

  // update state (reset to page 1)
  state.currentPage = 1;

  // check if interaction is recent or relevant sorting
  const recent = clickedButtonEl.className.includes("--recent") ? true : false;

  // make sorting button look (in)active
  if (recent) {
    sortingBtnRecentEl.classList.add("sorting__button--active");
    sortingBtnRelevantEl.classList.remove("sorting__button--active");
  } else {
    sortingBtnRecentEl.classList.remove("sorting__button--active");
    sortingBtnRelevantEl.classList.add("sorting__button--active");
  }

  // sort job items
  if (recent) {
    state.searchJobItems.sort((a, b) => {
      return a.daysAgo - b.daysAgo;
    });
  } else {
    state.searchJobItems.sort((a, b) => {
      return b.relevanceScore - a.relevanceScore;
    });
  }

  // reset pagination buttons
  renderPaginationButtons();

  // re-render the job list component
  renderJobList();
};

sortingEl.addEventListener("click", clickHandler);
