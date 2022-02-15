import { Redirect, Route } from 'react-router-dom';
import { hashAnyRoles, isAuthenticated, Role } from 'util/auth';

type Props = {
  children: React.ReactNode;
  path: string;
  roles?: Role[]
};

const PrivateRoute = ({ children, path, roles = [] }: Props) => {
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
    />
  );
};

export default PrivateRoute;
