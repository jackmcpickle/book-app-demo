import React from 'react';
import { Link } from 'react-router-dom';
import { TOGGLE_FAV } from '../../store/actions';
import { useAppContext } from '../../store';
import FavButton from '../FavButton';
import { List, ListItem } from '../List';

function Favs() {
  const [{ favourites , books }, dispatch] = useAppContext();

  const favBooks = books.filter(book => favourites.includes(book._id));

  return (
  <div>
    {favBooks.length ? (
      <List>
        {favBooks.filter(book => (
          <ListItem key={book._id}>
            <Link to={"/books/" + book._id}>
              <strong>
                {book.title} by {book.author}
              </strong>
            </Link>
            <FavButton active={favourites.includes(book._id)} onClick={() => dispatch({ type: TOGGLE_FAV, data: book._id})} />
          </ListItem>
        ))}
      </List>
    ) : (
      <h3>No Favourites to Display</h3>
    )}
    </div>
  )
}

export default Favs;
