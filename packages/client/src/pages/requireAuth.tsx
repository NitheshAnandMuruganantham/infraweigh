import { FunctionComponent } from 'react';
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import NavComponent from '../components/nav';
import Loading from '../components/loading';
import useUser from '../hooks/user';

const RequireAuth: FunctionComponent = () => {
  const [user, AuthLoading] = useUser();

  return AuthLoading ? (
    <Loading open={AuthLoading} setOpen={() => {}} />
  ) : !AuthLoading && user ? (
    <NavComponent>
      <Outlet />
    </NavComponent>
  ) : (
    <Navigate to={'/login'} replace />
  );
};

export default RequireAuth;
