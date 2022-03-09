import Navbar from 'components/Navbar';
import PrivateRoute from 'components/PrivateRoute';
import MovieDatails from 'pages/Private/MovietDatails';
import Home from 'pages/Home';
import { Switch, Route, Router } from 'react-router-dom';
import history from 'util/history';
import MoviesCatalog from 'pages/Private/MoviesCatalog';

const Routes = () => (
  <Router history={history}>
    <Navbar />
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <PrivateRoute path="/movies">
        <Route path="/movies" exact>
          <MoviesCatalog />
        </Route>
        <Route path="/movies/:movieId">
          <MovieDatails />
        </Route>
      </PrivateRoute>
    </Switch>
  </Router>
);

export default Routes;
