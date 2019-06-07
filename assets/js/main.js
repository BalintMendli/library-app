function library() {
  const myLibrary = [];

  function Book(title, author, read = false) {
    this.title = title;
    this.author = author;
    this.read = read;
  }

  function addBookToLibrary(title, author, read) {
    myLibrary.push(new Book(title, author, read));
  }

  addBookToLibrary('Old man', 'hemingway');
  console.log(myLibrary);
}

document.addEventListener('DOMContentLoaded', () => {
  library();
});
