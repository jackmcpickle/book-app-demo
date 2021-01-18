import React, { useState, useEffect } from "react";
import Jumbotron from "../components/Jumbotron";
import DeleteBtn from "../components/DeleteBtn";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import { getBooks, deleteBook, saveBook } from '../utils/API';
import { Link } from "react-router-dom";

function Books() {
  // Initialize books as an empty array
  const [message, setMessage] = useState({error: true, text: ''});
  const [books, setBooks] = useState([]);
  const [formObject, setFormObject] = useState({
    title: "a title",
    author: "an author",
    synopsis: ""
  })


  useEffect(() => {
    loadBooks();
  }, []);

  async function loadBooks() {
    const { data } = await getBooks();
    setBooks(data);
  }

  async function handleDeleteBook(id) {
    const oldBooks = [...books];
    const newBooks = books.filter(book => book._id !== id)
    setBooks(newBooks)
    try {
      await deleteBook(id);
      await loadBooks();
    } catch (error) {
      setBooks(oldBooks)
    }
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  async function handleFormSubmit(event) {
    event.preventDefault();

    if (formObject.title && formObject.author) {
      await saveBook({
        title: formObject.title,
        author: formObject.author,
        synopsis: formObject.synopsis
      })
      await setFormObject({
        title: "",
        author: "",
        synopsis: ""
      })
      await loadBooks()
    }
  };

    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>What Books Should I Read?</h1>
            </Jumbotron>
            <form onSubmit={handleFormSubmit}>
              <Input name="title" value={formObject.title} placeholder="Title (required)" onChange={handleInputChange}/>
              <Input name="author" value={formObject.author} placeholder="Author (required)" onChange={handleInputChange}/>
              <TextArea name="synopsis" value={formObject.synopsis} placeholder="Synopsis (Optional)" onChange={handleInputChange}/>
              <FormBtn>Submit Book</FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
            {books.length ? (
              <List>
                {books.map(book => (
                  <ListItem key={book._id}>
                    <Link to={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => handleDeleteBook(book._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
        {message.text &&
          <Row>
            <Col>
              <div className={`alert ${message.error ? 'alert-danger' : 'alert-success'}`}>{message.text}</div>
            </Col>
          </Row>}
      </Container>
    );
  }

export default Books;
