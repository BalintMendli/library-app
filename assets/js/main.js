function Book(title, author, pages, read = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function() {
  this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
}

function removeBook(i) {
  myLibrary.splice(i, 1);
}

const initialBooks = [
  ['The Catcher in the Rye', 'J.D. Salinger', 554, true],
  ['The Brothers Karamazov', 'Fyodor Dostoevsky', 811],
  ['Ulysses', 'James Joyce', 740]
];

const books =
  JSON.parse(localStorage.getItem('library')) ||
  initialBooks.map(b => ({
    title: b[0],
    author: b[1],
    pages: b[2],
    read: b[3]
  }));

const myLibrary = [];

books.forEach(book =>
  addBookToLibrary(book.title, book.author, book.pages, book.read)
);

function renderBook(book, parentNode) {
  const i = parentNode.childElementCount;
  const bookNode = document.createElement('div');
  bookNode.classList.add('book');
  bookNode.setAttribute('data-number', i);

  const titleNode = document.createElement('h2');
  titleNode.textContent = book.title;
  titleNode.classList.add('book-title');
  bookNode.appendChild(titleNode);

  const authorNode = document.createElement('p');
  authorNode.textContent = 'by ' + book.author;
  authorNode.classList.add('book-author');
  bookNode.appendChild(authorNode);

  const pagesNode = document.createElement('p');
  pagesNode.textContent = book.pages + ' pages';
  pagesNode.classList.add('book-pages');
  bookNode.appendChild(pagesNode);

  const readNode = document.createElement('p');
  readNode.textContent = 'Read: ';
  readNode.classList.add('book-read');
  if (book.read) readNode.classList.add('checked');
  function updateRead() {
    book.toggleRead();
    storeLibrary();
    renderLibrary();
  }
  readNode.addEventListener('click', updateRead);
  bookNode.appendChild(readNode);

  const removeNode = document.createElement('p');
  removeNode.textContent = 'Remove book';
  removeNode.classList.add('book-remove', 'button');
  function deleteBook() {
    removeBook(i);
    storeLibrary();
    renderLibrary();
  }
  removeNode.addEventListener('click', deleteBook);
  bookNode.appendChild(removeNode);

  container.appendChild(bookNode);
}

const container = document.querySelector('#book-container');

function renderLibrary() {
  clearNodes(container);
  myLibrary.forEach(book => renderBook(book, container));
}

function clearNodes(node) {
  [...node.childNodes].forEach(childNode => childNode.remove());
}

function storeLibrary() {
  localStorage.setItem('library', JSON.stringify(myLibrary));
}

document.querySelector('#new-book-button').addEventListener('click', () => {
  document.querySelector('.form').classList.toggle('hide');
});

function getNewBookFromForm() {
  const title = document.querySelector('#title-input').value;
  const author = document.querySelector('#author-input').value;
  const pages = document.querySelector('#pages-input').value;
  if (!pages || pages % 1 !== 0 || pages < 0) {
    alert('Please enter a valid page number.');
    return;
  }
  const read = document.querySelector('#read-input').checked;
  if (title && author) {
    addBookToLibrary(title, author, pages, read);
    storeLibrary();
    renderLibrary();
    document.querySelector('.form').classList.add('hide');
    document.querySelector('#title-input').value = '';
    document.querySelector('#author-input').value = '';
    document.querySelector('#pages-input').value = '';
    document.querySelector('#read-input').checked = false;
  } else {
    alert("Title and author can't be empty.");
  }
}
document
  .querySelector('#add-book-button')
  .addEventListener('click', getNewBookFromForm);

renderLibrary();
