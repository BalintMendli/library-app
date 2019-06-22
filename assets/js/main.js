function Book(title, author, pages, read = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function() {
  this.read = !this.read;
};

function addBookToLibrary(book, library) {
  const { title, author, pages, read } = book;
  const newLibrary = [...library, new Book(title, author, pages, read)];
  return newLibrary;
}

function removeBook(index, library) {
  newLibrary = library.filter((b, i) => i !== index);
  return newLibrary;
}

function updateRead(index, library) {
  newLibrary = library.map((b, i) => {
    if (i === index) {
      newB = Object.assign(Object.create(Book.prototype), b);
      newB.toggleRead();
      return newB;
    } else {
      return b;
    }
  });
  return newLibrary;
}

const initialBooks = [
  { title: 'The Catcher in the Rye', author: 'J.D. Salinger', pages: 554 },
  { title: 'The Brothers Karamazov', author: 'Fyodor Dostoevsky', pages: 811 },
  { title: 'Ulysses', author: 'James Joyce', pages: 740, read: true }
];

function setOrExtractLibrary(initialData) {
  if (!localStorage.getItem('library'))
    localStorage.setItem('library', JSON.stringify(initialData));
  const books = JSON.parse(localStorage.getItem('library'));
  return books;
}

const books = setOrExtractLibrary(initialBooks);

let myLibrary = [];

books.forEach(book => (myLibrary = addBookToLibrary(book, myLibrary)));

const container = document.querySelector('#book-container');

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
  function changeRead() {
    myLibrary = updateRead(i, myLibrary);
    storeLibrary(myLibrary);
    renderLibrary(myLibrary, container);
  }
  readNode.addEventListener('click', changeRead);
  bookNode.appendChild(readNode);

  const removeNode = document.createElement('p');
  removeNode.textContent = 'Remove book';
  removeNode.classList.add('book-remove', 'button');
  function deleteBook() {
    myLibrary = removeBook(i, myLibrary);
    storeLibrary(myLibrary);
    renderLibrary(myLibrary, container);
  }
  removeNode.addEventListener('click', deleteBook);
  bookNode.appendChild(removeNode);

  container.appendChild(bookNode);
}

function renderLibrary(library, node) {
  clearNodes(node);
  library.forEach(book => renderBook(book, node));
}

function clearNodes(node) {
  [...node.childNodes].forEach(childNode => childNode.remove());
}

function storeLibrary(library) {
  localStorage.setItem('library', JSON.stringify(library));
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
    document.querySelector('.form').classList.add('hide');
    document.querySelector('#title-input').value = '';
    document.querySelector('#author-input').value = '';
    document.querySelector('#pages-input').value = '';
    document.querySelector('#read-input').checked = false;
  } else {
    alert("Title and author can't be empty.");
    return;
  }
  return { title, author, pages, read };
}

function saveNewBookFromForm() {
  const newBook = getNewBookFromForm();
  if (newBook) {
    myLibrary = addBookToLibrary(newBook, myLibrary);
    storeLibrary(myLibrary);
    renderLibrary(myLibrary, container);
  }
}

document
  .querySelector('#add-book-button')
  .addEventListener('click', saveNewBookFromForm);

renderLibrary(myLibrary, container);
