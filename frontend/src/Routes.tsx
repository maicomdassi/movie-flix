import Navbar from 'components/Navbar';
import PrivateRoute from 'components/PrivateRoute';
import MovieDatails from 'pages/Private/MovietDatails';
import Home from 'pages/Home';
import Movies from 'pages/Private/MoviesCatalog';
import { Switch, Route, Router } from 'react-router-dom';
import history from 'util/history';

const Routes = () => (
  <Router history={history}>
    <Navbar />
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <PrivateRoute path="/movies">
        <Route path="/movies" exact>
          <Movies />
        </Route>
        <Route path="/movies/:movieId">
          <MovieDatails />
        </Route>
      </PrivateRoute>
    </Switch>
  </Router>
);

export default Routes;
