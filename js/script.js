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
// Filter Select Options
// =================================================
function createFilterSelectOptions() {
  const genreGroup = document.createElement("optgroup");
  genreGroup.label = "Genres";
  const allOption = document.createElement("option");
  allOption.value = "all";
  allOption.textContent = "All";
  filterSelect.appendChild(allOption);
  const uniqueGenres = [...new Set(books.map((book) => book.genre))];

  uniqueGenres.forEach((genre) => {
    const option = document.createElement("option");
    option.value = `genre:${genre}`;
    option.textContent = genre;

    genreGroup.append(option);
  });

  const statusGroup = document.createElement("optgroup");
  statusGroup.label = "Reading Status";

  const uniqueStatus = [...new Set(books.map((book) => book.status))];

  uniqueStatus.forEach((status) => {
    const statusOption = document.createElement("option");
    statusOption.value = `status:${status}`;
    statusOption.textContent = status;

    statusGroup.append(statusOption);
  });

  filterSelect.append(genreGroup, statusGroup);
}

// =================================================
// Sort Select Options
// =================================================
function createSortSelectOptions() {
  const defaultOption = document.createElement("option");
  defaultOption.value = "default";
  defaultOption.textContent = "Default";
  sortSelect.appendChild(defaultOption);

  const titleOption = document.createElement("option");
  titleOption.value = "title";
  titleOption.textContent = "Title A-Z";
  sortSelect.appendChild(titleOption);

  const pageCountOption = document.createElement("option");
  pageCountOption.value = "pages";
  pageCountOption.textContent = "Number of Pages";
  sortSelect.appendChild(pageCountOption);
}

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
  let filteredBooks = [...books];

  // filteredBooks = filterByStatus(filteredBooks);
  // filteredBooks = filterBooks(filteredBooks);
  // filteredBooks = searchBooks(filteredBooks);
  // filteredBooks = sortBooks(filteredBooks);

  console.log(filterBooks);

  renderCardList(filteredBooks);
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
  createFilterSelectOptions();
  createSortSelectOptions();
  renderCardList(books);
}

init();
