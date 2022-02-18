import Navbar from 'components/Navbar';
import PrivateRoute from 'components/PrivateRoute';
import MovieDatails from 'MovietDatails';
//import MovieDatails from "MovietDatails";
import Auth from 'pages/Auth';
import Movies from 'pages/Movies';
import { Switch, Route, Redirect, Router } from 'react-router-dom';
import history from 'util/history';

const Routes = () => (
  <Router history={history}>
    <Navbar />
    <Switch>
      <Route path="/" exact>
        <Auth />
      </Route>
      <Redirect from="/auth" to="/auth/login" exact></Redirect>
      <Route path="/auth">
        <Auth />
      </Route>
      <PrivateRoute path="/movies" exact>      
        <Movies />             
      </PrivateRoute>
      <PrivateRoute path="/movies/:movieId">     
        <MovieDatails />      
      </PrivateRoute>
    </Switch>
  </Router>
  //<Navbar/>
  /*   <Router history={history}>
    <Navbar />
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/products" exact>
        <Catalog />
      </Route>
      <Route path="/products/:productId">
        <ProductDetails />
      </Route>
      <Redirect from="/admin/auth" to="/admin/auth/login" exact></Redirect>
      <Route path="/admin/auth">
        <Auth />
      </Route>
      <Redirect from="/admin" to="/admin/products" exact></Redirect>
      <Route path="/admin">
        <Admin />
      </Route>
    </Switch>
  </Router> */
);
export default Routes;
