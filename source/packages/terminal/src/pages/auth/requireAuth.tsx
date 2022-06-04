import { FunctionComponent, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@infra-weigh/firebase';
import { Navigate } from 'react-router-dom';
import Loading from '@infra-weigh/loading';
import { NavComponent } from '@infra-weigh/shared-ui';
import AccessControl from './accessControl';
import useRole from '../../hooks/role';

const RequireAuth: FunctionComponent = () => {
  const location = useLocation();
  const [user, loading] = useAuthState(auth);
  const [role, Reloading] = useRole();
  return loading || Reloading ? (
    <Loading open={true} setOpen={() => null} />
  ) : user ? (
    <NavComponent>
      <AccessControl role={role || ''}>
        <Outlet />
      </AccessControl>
    </NavComponent>
  ) : (
    <Navigate
      to={'/login'}
      replace
      state={{
        from: location.pathname,
      }}
    />
  );
};

export default RequireAuth;
