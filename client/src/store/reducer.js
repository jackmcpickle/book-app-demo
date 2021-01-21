import { TOGGLE_FAV, LOAD_BOOKS, DELETE_BOOK } from "./actions";

export function reducer(state, { type, data }) {
  console.log({ type, data });
  switch (type) {
    case TOGGLE_FAV:
      if (state.favourites.includes(data)) {
        return {
          ...state,
          favourites: state.favourites.filter(fav => fav !== data)
        }
      } else {
        return {
          ...state,
          favourites: [...state.favourites, data]
        }
      }
    case LOAD_BOOKS: {
      return {
          ...state,
          books: data
        }
    }
    case DELETE_BOOK: {
      return {
          ...state,
          books: state.books.filter(book => book !== data)
        }
    }
    default:
      return state;
  }
}
