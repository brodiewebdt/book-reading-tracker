import { books } from "../data.js";

// =================================================
// DOM References
// =================================================
const searchInput = document.querySelector("#search");
const filterSelect = document.querySelector("#filter");
const sortSelect = document.querySelector("#sort");
const cardGrid = document.querySelector("#results");
const emptyState = document.querySelector("#empty-state");

// =================================================
// State
// =================================================
const state = {
  books,
  searchTerm: "",
  filterBy: "all",
  sortBy: "default",
  currentStatus: "all",
};

// =================================================
// Card Creation
// =================================================
function createBookCardTemplate(book) {
  return `
    <article class="card book-card">
        <h3 class="card-title">${book.title}</h3>
        <p>
          <span class="detail-label">By: </span>
          <span class="detail-value">${book.author}</span>
        </p>
        <p>
          <span class="detail-label">Genre: </span>
          <span class="detail-value">${book.genre}</span>
        </p>
        <p>
          <span class="detail-label">Pages: </span>
          <span class="detail-value">${book.pages}</span>
        </p>
        <p>
          <span class="detail-label">Rating: </span>
          <span class="detail-value">${book.rating === null ? "Unrated" : book.rating}</span>
        </p>
        <p>
          <span class="detail-label">Status: </span>
          <span class="detail-value">${book.status}</span>
        </p>
      </article>
  `;
}

function renderCardList(books) {
  emptyState.classList.add("hidden");
  cardGrid.innerHTML = "";

  if (books.length === 0) {
    emptyState.classList.remove("hidden");
    return;
  }

  books.forEach((book) => {
    cardGrid.innerHTML = books.map(createBookCardTemplate).join("");
  });
}

// =================================================
// Filtering and Sorting
// =================================================
// Group Filter Function
function updateBooks() {
  console.log(`updateBooks called`);
}

// =================================================
// Event Listeners
// =================================================

filterSelect.addEventListener("change", (e) => {
  state.filterBy = e.target.value;
  updateBooks();

  console.log(state.filterBy);
});

searchInput.addEventListener("input", (e) => {
  state.searchTerm = e.target.value;
  updateBooks();

  console.log(state.searchTerm);
});

sortSelect.addEventListener("change", (e) => {
  state.sortBy = e.target.value;
  updateBooks();

  console.log(state.sortBy);
});

// =================================================
// Initialization
// =================================================
function init() {
  renderCardList(books);
}

init();
