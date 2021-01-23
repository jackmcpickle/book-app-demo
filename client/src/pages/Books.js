import React, { useState, useEffect } from 'react';
import Jumbotron from '../components/Jumbotron';
import DeleteBtn from '../components/DeleteBtn';
import FavButton from '../components/FavButton';
import { Col, Row, Container } from '../components/Grid';
import { List, ListItem } from '../components/List';
import { Input, TextArea, FormBtn } from '../components/Form';
import { getBooks, deleteBook, saveBook } from '../utils/API';
import { Link } from 'react-router-dom';
import { useAppContext } from '../store/index';
import { DELETE_BOOK, LOAD_BOOKS, TOGGLE_FAV } from '../store/actions';

function Books() {
    // Initialize books as an empty array
    const [formObject, setFormObject] = useState({
        title: 'a title',
        author: 'an author',
        synopsis: '',
    });

    const [{ favourites, books }, dispatch] = useAppContext();

    useEffect(() => {
        loadBooks();
    }, []);

    async function loadBooks() {
        const { data } = await getBooks();
        dispatch({ type: LOAD_BOOKS, data });
    }

    async function handleDeleteBook(id) {
        const oldBooks = [...books];
        dispatch({ type: DELETE_BOOK, data: id });
        try {
            await deleteBook(id);
            await loadBooks();
        } catch (error) {
            dispatch({ type: LOAD_BOOKS, data: oldBooks });
        }
    }

    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value });
    }

    // When the form is submitted, use the API.saveBook method to save the book data
    // Then reload books from the database
    async function handleFormSubmit(event) {
        event.preventDefault();

        if (formObject.title && formObject.author) {
            await saveBook({
                title: formObject.title,
                author: formObject.author,
                synopsis: formObject.synopsis,
            });
            await setFormObject({
                title: '',
                author: '',
                synopsis: '',
            });
            await loadBooks();
        }
    }

    return (
        <Container fluid>
            <Row>
                <Col size="md-6">
                    <Jumbotron>
                        <h1>What Books Should I Read?</h1>
                    </Jumbotron>
                    <form onSubmit={handleFormSubmit}>
                        <Input
                            name="title"
                            value={formObject.title}
                            placeholder="Title (required)"
                            onChange={handleInputChange}
                        />
                        <Input
                            name="author"
                            value={formObject.author}
                            placeholder="Author (required)"
                            onChange={handleInputChange}
                        />
                        <TextArea
                            name="synopsis"
                            value={formObject.synopsis}
                            placeholder="Synopsis (Optional)"
                            onChange={handleInputChange}
                        />
                        <FormBtn>Submit Book</FormBtn>
                    </form>
                </Col>
                <Col size="md-6 sm-12">
                    <Jumbotron>
                        <h1>Books On My List</h1>
                    </Jumbotron>
                    {books.length ? (
                        <List>
                            {books.map((book) => (
                                <ListItem key={book._id}>
                                    <Link to={'/books/' + book._id}>
                                        <strong>
                                            {book.title} by {book.author}
                                        </strong>
                                    </Link>
                                    <DeleteBtn
                                        onClick={() =>
                                            handleDeleteBook(book._id)
                                        }
                                    />
                                    <FavButton
                                        active={favourites.includes(book._id)}
                                        onClick={() =>
                                            dispatch({
                                                type: TOGGLE_FAV,
                                                data: book._id,
                                            })
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <h3>No Results to Display</h3>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default Books;
