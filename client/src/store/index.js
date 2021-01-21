import React, { useContext, createContext, useReducer } from "react";
import { reducer } from './reducer';

const initialState = {
  favourites: [],
  books: []
}

const AppContext = createContext({ initialState, dispatch: () => { }});

const AppProvider = ({...props }) => {
  const [favourites, dispatch] = useReducer(reducer, initialState);

  return <AppContext.Provider value={[favourites, dispatch]} {...props} />;
}

function useAppContext() {
  return useContext(AppContext);
}

export { AppProvider, useAppContext };
