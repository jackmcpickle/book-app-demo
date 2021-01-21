import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Books from "./pages/Books";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import { AppProvider } from "./store";
import Favs from "./components/Favs";

function App() {
  return (
    <AppProvider>
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route exact path={["/", "/books"]}>
              <Books />
            </Route>
            <Route exact path="/books/:id">
              <Detail />
            </Route>
            <Route exact path="/favourites">
              <Favs />
            </Route>
            <Route>
              <NoMatch />
            </Route>
          </Switch>
        </div>
        </Router>
      </AppProvider>
  );
}

export default App;
