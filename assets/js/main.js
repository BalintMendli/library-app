function libraryMain() {
  const myLibrary = [];

  function Book(title, author, read = false) {
    this.title = title;
    this.author = author;
    this.read = read;
  }

  function addBookToLibrary(title, author, read) {
    myLibrary.push(new Book(title, author, read));
  }

  addBookToLibrary('The Catcher in the Rye', 'J.D. Salinger', true);
  addBookToLibrary('The Brothers Karamazov', 'Fyodor Dostoevsky');
  addBookToLibrary('Ulysses', 'James Joyce');

  const container = document.querySelector('#book-container');
  [...container.childNodes].forEach(el => el.remove());

  function addBookNode(book, i) {
    const bookNode = document.createElement('div');
    bookNode.classList.add('book');
    bookNode.setAttribute('data-number', i);

    const title = document.createElement('h2');
    title.textContent = book.title;
    title.classList.add('book-title');
    bookNode.appendChild(title);

    const author = document.createElement('p');
    author.textContent = book.author;
    author.classList.add('book-author');
    bookNode.appendChild(author);

    const read = document.createElement('p');
    read.textContent = book.read ? 'read' : 'not read';
    read.classList.add('book-read');
    function updateRead() {
      myLibrary[i].read = !myLibrary[i].read;
      const readNode = document.querySelector(
        `[data-number='${i}'] .book-read`
      );
      readNode.textContent = myLibrary[i].read ? 'read' : 'not read';
    }
    read.addEventListener('click', updateRead);
    bookNode.appendChild(read);

    const remove = document.createElement('p');
    remove.textContent = 'Remove book';
    remove.classList.add('book-remove');
    function removeBook() {
      myLibrary.splice(i, 1);
      document.querySelector(`[data-number='${i}']`).remove();
    }
    remove.addEventListener('click', removeBook);
    bookNode.appendChild(remove);

    container.appendChild(bookNode);
  }

  function render() {
    myLibrary.forEach((book, i) => addBookNode(book, i));
  }

  document.querySelector('#new-book').addEventListener('click', () => {
    document.querySelector('.form').classList.toggle('hide');
  });

  function addBook() {
    const title = document.querySelector('#title-input').value;
    const author = document.querySelector('#author-input').value;
    const read = document.querySelector('#read-input').checked;
    if (title && author) {
      const book = new Book(title, author, read);
      myLibrary.push(book);
      addBookNode(book, myLibrary.length);
      document.querySelector('.form').classList.add('hide');
      document.querySelector('#title-input').value = '';
      document.querySelector('#author-input').value = '';
      document.querySelector('#read-input').checked = false;
    } else {
      alert("Title and author can't be empty.");
    }
  }
  document.querySelector('#add-book').addEventListener('click', addBook);

  render();
}

document.addEventListener('DOMContentLoaded', libraryMain);
