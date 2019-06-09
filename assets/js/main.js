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
  console.log(myLibrary);

  function render() {
    const container = document.querySelector('#book-container');
    myLibrary.forEach((book, i) => {
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
      container.appendChild(bookNode);
    });
  }

  render();
}

document.addEventListener('DOMContentLoaded', libraryMain);
