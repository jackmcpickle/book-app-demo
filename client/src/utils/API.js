import axios from "axios";


export function getBooks() {
  return axios.get("/api/books");
};
// Gets the book with the given id
export function getBook(id) {
  return axios.get("/api/books/" + id);
};
// Deletes the book with the given id
export function deleteBook(id) {
  return axios.delete("/api/books/" + id);
};
// Saves a book to the database
export function saveBook(bookData) {
  return axios.post("/api/books", bookData);
}
