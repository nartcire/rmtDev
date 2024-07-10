import {
  bookmarksBtnEl,
  jobDetailsEl,
  jobListBookmarksEl,
  state,
} from "../common.js";

import renderJobList from "./JobList.js";

const clickHandler = (event) => {
  // don't continue if click was outside bookmark button
  if (!event.target.className.includes("bookmark")) {
    return;
  }

  // update state
  if (
    state.bookmarkJobItems.some(
      (jobItem) => jobItem.id === state.activeJobItem.id
    )
  ) {
    state.bookmarkJobItems = state.bookmarkJobItems.filter(
      (jobItem) => state.activeJobItem.id !== jobItem.id
    );
  } else {
    state.bookmarkJobItems.push(state.activeJobItem);
  }

  // update bookmark icon
  document
    .querySelector(".job-info__bookmark-icon")
    .classList.toggle("job-info__bookmark-icon--bookmarked");
};

const mouseEnterHandler = () => {
  // make bookmarks button Look active
  bookmarksBtnEl.classList.add("bookmark-btn-active");

  // make job list visible
  jobListBookmarksEl.classList.add("job-list--visible");

  // render bookmarks job list
  renderJobList("bookmarks");
};

const mouseLeaveHandler = () => {
  // make bookmarks button Look inactive
  bookmarksBtnEl.classList.remove("bookmark-btn-active");

  // make job list invisible
  jobListBookmarksEl.classList.remove("job-list--visible");
};

bookmarksBtnEl.addEventListener("mouseenter", mouseEnterHandler);
jobListBookmarksEl.addEventListener("mouseleave", mouseLeaveHandler);
jobDetailsEl.addEventListener("click", clickHandler);
