import { books } from "../data.js";

// =================================================
// DOM References
// =================================================
const cardGrid = document.querySelector("#results");
const emptyState = document.querySelector("#empty-state");

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
          <span class="detail-value">${book.ratings}</span>
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
// Initialization
// =================================================
function init() {
  renderCardList(books);
}

init();
