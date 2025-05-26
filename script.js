class Book {
  constructor(title, author, pages, isRead) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
}

const myLibrary = [
  new Book("A Clockwork Orange", "Anthony Burgees", 240, false),
  new Book("Brave New World", "Aldous Huxley", 200, true),
  new Book("The Stranger", "Albert Camus", 100, true),
  new Book("Catcher in the Rye", "J. D. Salinger", 210, true),
];

const cardContainer = document.querySelector(".card-container");
const formContainer = document.querySelector(".form-container");
const callBookFormBtn = document.querySelector("#call-book-form");
const addBookBtn = document.querySelector("#add-book");
const closeFormBtn = document.querySelector(".close-form");
const overlay = document.querySelector(".overlay");

const formAddBook = document.querySelector(".add-book-form");
const formBook = document.querySelector(".book-form > form");
const formTitle = document.querySelector("#title");
const formAuthor = document.querySelector("#author");
const formPages = document.querySelector("#pages");
const formRead = document.querySelector("#isRead");

displayBooks();

function addBookToLibrary(title, author, pages, isRead) {
  let newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);
}

function removeBookFromLibrary() {
  let bookID = this.parentElement.dataset.id;
  myLibrary.splice(
    myLibrary.findIndex((book) => book.id === bookID),
    1
  );
  let bookCard = document.querySelector(`[data-id="${bookID}"]`);
  bookCard.remove();
}

function changeBookReadStatus() {
  let bookID = this.parentElement.parentElement.dataset.id;
  let bookIndex = myLibrary.findIndex((book) => book.id === bookID);
  myLibrary[bookIndex].isRead = !myLibrary[bookIndex].isRead;
}

function createBookCard(book) {
  const card = document.createElement("div");
  card.classList.add("card");

  const title = document.createElement("h2");
  title.classList.add("book-title");
  title.textContent = book.title;
  card.appendChild(title);

  const deleteBookBtn = document.createElement("button");
  deleteBookBtn.classList.add("delete-book");
  deleteBookBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Delete Book</title><path d="M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12L20 6.91Z" /></svg>`;
  deleteBookBtn.addEventListener("click", removeBookFromLibrary);
  card.appendChild(deleteBookBtn);

  //create div for author along with icon
  const author = document.createElement("div");
  author.classList = "author";
  author.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,6A2,2 0 0,0 10,8A2,2 0 0,0 12,10A2,2 0 0,0 14,8A2,2 0 0,0 12,6M12,13C14.67,13 20,14.33 20,17V20H4V17C4,14.33 9.33,13 12,13M12,14.9C9.03,14.9 5.9,16.36 5.9,17V18.1H18.1V17C18.1,16.36 14.97,14.9 12,14.9Z" /></svg>`;

  const authorSpan = document.createElement("span");
  authorSpan.innerHTML = `by <em>${book.author}</em>`;
  author.appendChild(authorSpan);

  card.appendChild(author);

  //create div for pages display along with icon
  const pages = document.createElement("div");
  pages.classList = "pages";
  pages.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14,10H19.5L14,4.5V10M5,3H15L21,9V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3M5,5V19H19V12H12V5H5Z" /></svg>`;

  const pagesSpan = document.createElement("span");
  pagesSpan.textContent = book.pages + " pages";
  pages.appendChild(pagesSpan);

  card.appendChild(pages);

  //create div for display of reading status with checkbox
  const isRead = document.createElement("div");
  isRead.classList = "is-read-container";
  const isReadLabel = document.createElement("label");
  isReadLabel.setAttribute("for", `read ${book.title}`);
  isReadLabel.textContent = "Read";

  const isReadCheckbox = document.createElement("input");
  isReadCheckbox.setAttribute("type", "checkbox");
  isReadCheckbox.setAttribute("id", `read ${book.title}`);
  if (book.isRead) isReadCheckbox.setAttribute("checked", "checked");

  //change status of book in 'database'
  isReadCheckbox.addEventListener("click", changeBookReadStatus);

  isRead.appendChild(isReadCheckbox);
  isRead.appendChild(isReadLabel);
  card.appendChild(isRead);

  card.dataset.id = book.id;

  return card;
}

function displayBooks() {
  cardContainer.innerHTML = "";
  myLibrary.forEach((book) => {
    const bookCard = createBookCard(book);
    cardContainer.appendChild(bookCard);
  });
}

function closeForm() {
  formContainer.classList = "form-container closed";
  overlay.style.display = "none";
}

callBookFormBtn.addEventListener("click", () => {
  formContainer.classList = formContainer.classList.contains("closed")
    ? "form-container"
    : "form-container closed";
  overlay.style.display = "block";
});

formAddBook.addEventListener("submit", (event) => {
  event.preventDefault();
  addBookToLibrary(
    formTitle.value,
    formAuthor.value,
    formPages.value,
    formRead.checked
  );

  formBook.reset();

  closeForm();
  displayBooks();
});

closeFormBtn.addEventListener("click", closeForm);
