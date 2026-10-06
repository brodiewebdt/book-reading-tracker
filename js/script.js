import { books } from "../data.js";

// =================================================
// DOM References
// =================================================
const searchInput = document.querySelector("#search");
const filterSelect = document.querySelector("#filter");
const sortSelect = document.querySelector("#sort");
const cardGrid = document.querySelector("#results");
const emptyState = document.querySelector("#empty-state");
const resultsCount = document.querySelector("#results-count");

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
  allOption.textContent = "All Books";
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
  defaultOption.textContent = "Default Book Order";
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

  filteredBooks = filterBooks(filteredBooks);
  filteredBooks = searchBooks(filteredBooks);
  filteredBooks = sortBooks(filteredBooks);

  resultsCount.textContent = `${filteredBooks.length} books`;

  renderCardList(filteredBooks);
}

function filterBooks(books) {
  if (state.filterBy === "all") {
    return books;
  }

  const [filterType, filterValue] = state.filterBy.split(":");

  return books.filter((book) => book[filterType] === filterValue);
}

function searchBooks(books) {
  return books.filter(
    (book) =>
      book.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(state.searchTerm.toLowerCase()),
  );
}

function sortBooks(books) {
  const sortedBooks = [...books];

  if (state.sortBy === "default") {
    return books;
  }

  if (state.sortBy === "title") {
    sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
  }

  if (state.sortBy === "pages") {
    sortedBooks.sort((a, b) => a.pages - b.pages);
  }

  return sortedBooks;
}

// =================================================
// Event Listeners
// =================================================

filterSelect.addEventListener("change", (e) => {
  state.filterBy = e.target.value;
  updateBooks();
});

searchInput.addEventListener("input", (e) => {
  state.searchTerm = e.target.value;
  updateBooks();
});

sortSelect.addEventListener("change", (e) => {
  state.sortBy = e.target.value;
  updateBooks();
});

// =================================================
// Calculate Summary
// =================================================
function calculateSummary(books) {
  const totalBooks = books.length;
  const totalPages = books.reduce((sum, book) => sum + book.pages, 0);
  const totalFinishedBooks = books.filter(
    (book) => book.status === "Finished",
  ).length;
  const totalReadingBooks = books.filter(
    (book) => book.status === "Reading",
  ).length;

  return {
    totalBooks,
    totalPages,
    totalFinishedBooks,
    totalReadingBooks,
  };
}

function displaySummary(summary) {
  const summaryGrid = document.querySelector(".summary");
  summaryGrid.innerHTML = `
  <div class="summary-card"><p>Total Books:</p> <span>${summary.totalBooks}</span>
  </div>
  <div class="summary-card"><p>Total Pages:</p> <span>${summary.totalPages}</span>
  </div>
  <div class="summary-card">
  <p>Finished:</p> <span>${summary.totalFinishedBooks}</span>
  </div>
  <div class="summary-card">
   <p>Total Books being read:</p> <span>${summary.totalReadingBooks}</span>
  </div>  
  `;
}

// =================================================
// Initialization
// =================================================
function init() {
  createFilterSelectOptions();
  createSortSelectOptions();
  renderCardList(books);

  resultsCount.textContent = `${books.length} books`;

  const summary = calculateSummary(books);
  displaySummary(summary);
}

init();
