const bookVisibility = () => {
  document.getElementById("book-count").style.visibility = "visible";
};

const searchClick = () => {
  document.getElementById("book-count").style.display = "block";
  document.getElementById("book-count").style.visibility = "hidden";
  document.getElementById("empty-search").style.display = "none";
  document.getElementById("books-section").innerHTML = "";
  const bookID = document.getElementById("input-field").value;
  if (bookID === "") {
    document.getElementById("empty-search").style.display = "block";
    document.getElementById("book-count").style.display = "none";
  } else {
    getBooks(bookID);
  }
};

const getBooks = (bookID) => {
  document.getElementById("book-count").style.display = "none";
  document.getElementById("searching").style.display = "block";
   const url = `https://openlibrary.org/search.json?q=${bookID}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => books(data));
};

const books = (bookList) => {
  document.getElementById("searching").style.display = "none";
  document.getElementById("book-count").style.display = "block";
  document.getElementById("book-count").style.visibility = "visible";
  const bookCount = document.getElementById("book-count");
  bookCount.innerText = `${bookList.numFound} Books found.`;
  document.getElementById("input-field").value = "";
  bookData(bookList.docs);
};

const bookData = (bookList) => {
  const bookSection = document.getElementById("books-section");
  bookList.forEach((element) => {
    const bookName = element.title;
    let authors = element.author_name;
    let publisher = element.publisher;
    let publishYear = element.first_publish_year;
    const coverID = element.cover_i;

    if (typeof authors !== "undefined" && typeof authors === "object") {
      authors = authors.shift();
    }
    if (typeof publisher !== "undefined" && typeof publisher === "object") {
      publisher = publisher.shift();
    }

    const book = document.createElement("div");
    book.innerHTML = `
    <div class="book">
          <div class="book-img">
            <img
              src="https://covers.openlibrary.org/b/id/${coverID}-M.jpg"
              alt=""
            />
          </div>
          <div>
            <p>Book Name: <span class="bold-text">${bookName}</span></p>
            <p>Author: <span class="bold-text">${authors}</span></p>
            <p>Publisher: <span class="bold-text">${publisher}</span></p>
            <p>Publish Year: <span class="bold-text">${publishYear}</span></p>
          </div>
        </div>
    `;
    bookSection.appendChild(book);
  });
};
