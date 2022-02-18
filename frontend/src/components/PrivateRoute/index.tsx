import { Redirect, Route } from 'react-router-dom';
import { hashAnyRoles, isAuthenticated, Role } from 'util/auth';

type Props = {
  children: React.ReactNode;
  path: string;
  roles?: Role[];
  exact?: boolean;
};

const PrivateRoute = ({ children, path, roles = [], exact = false }: Props) => {
  return (
    <Route
      path={path}
      render={({ location }) =>
        !isAuthenticated() ? (
          <Redirect
            to={{
              pathname: '/auth/login',
              state: { from: location },
            }}
          />
        ) : !hashAnyRoles(roles) ? (
          <Redirect to="/movies" />
        ) : (
          children
        )
      }
      exact={exact} 
    />
  );
};

export default PrivateRoute;
