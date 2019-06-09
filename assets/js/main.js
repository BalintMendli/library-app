function libraryMain() {
  const myLibrary = [];

  function Book(title, author, read = false) {
    this.title = title;
    this.author = author;
    this.read = read;
  }

  Book.prototype.render = function(i) {
    const bookNode = document.createElement('div');
    bookNode.classList.add('book');
    bookNode.setAttribute('data-number', i);

    const titleNode = document.createElement('h2');
    titleNode.textContent = this.title;
    titleNode.classList.add('book-title');
    bookNode.appendChild(titleNode);

    const authorNode = document.createElement('p');
    authorNode.textContent = this.author;
    authorNode.classList.add('book-author');
    bookNode.appendChild(authorNode);

    const readNode = document.createElement('p');
    readNode.textContent = this.read ? 'read' : 'not read';
    readNode.classList.add('book-read');
    function updateRead() {
      myLibrary[i].read = !myLibrary[i].read;
      const readNodeToChange = document.querySelector(
        `[data-number='${i}'] .book-read`
      );
      readNodeToChange.textContent = myLibrary[i].read ? 'read' : 'not read';
    }
    readNode.addEventListener('click', updateRead);
    bookNode.appendChild(readNode);

    const removeNode = document.createElement('p');
    removeNode.textContent = 'Remove book';
    removeNode.classList.add('book-remove');
    function removeBook() {
      myLibrary.splice(i, 1);
      renderLibrary();
    }
    removeNode.addEventListener('click', removeBook);
    bookNode.appendChild(removeNode);

    container.appendChild(bookNode);
  };

  const container = document.querySelector('#book-container');

  function addBookToLibrary(title, author, read) {
    myLibrary.push(new Book(title, author, read));
  }

  addBookToLibrary('The Catcher in the Rye', 'J.D. Salinger', true);
  addBookToLibrary('The Brothers Karamazov', 'Fyodor Dostoevsky');
  addBookToLibrary('Ulysses', 'James Joyce');

  function renderLibrary() {
    [...container.childNodes].forEach(node => node.remove());
    myLibrary.forEach((book, i) => book.render(i));
  }

  document.querySelector('#new-book').addEventListener('click', () => {
    document.querySelector('.form').classList.toggle('hide');
  });

  function addNewBook() {
    const title = document.querySelector('#title-input').value;
    const author = document.querySelector('#author-input').value;
    const read = document.querySelector('#read-input').checked;
    if (title && author) {
      addBookToLibrary(title, author, read);
      myLibrary[myLibrary.length - 1].render(myLibrary.length - 1);
      document.querySelector('.form').classList.add('hide');
      document.querySelector('#title-input').value = '';
      document.querySelector('#author-input').value = '';
      document.querySelector('#read-input').checked = false;
    } else {
      alert("Title and author can't be empty.");
    }
  }
  document.querySelector('#add-book').addEventListener('click', addNewBook);

  renderLibrary();
}

document.addEventListener('DOMContentLoaded', libraryMain);
