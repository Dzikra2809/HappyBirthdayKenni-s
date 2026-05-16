

// DELAY CLICK PAGE
const book = document.getElementById("book");

book.addEventListener("click", function () {
  book.style.pointerEvents = "none";

  setTimeout(() => {
    book.style.pointerEvents = "auto";
  }, 1000);
});