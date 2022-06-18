import { FunctionComponent, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@infra-weigh/firebase';
import { Navigate } from 'react-router-dom';
import Loading from '@infra-weigh/loading';
import { NavComponent } from '@infra-weigh/shared-ui';
import AccessControl from './accessControl';
import useRole from '../../hooks/role';
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';

const RequireAuth: FunctionComponent = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [user, AuthLoading] = useAuthState(auth);
  const [role, roleLoading] = useRole();
  const [isAnonymousGuardActive, setIsAnonymousGuardActive] = useState(false);
  useEffect(() => {
    if (AuthLoading || roleLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [AuthLoading, roleLoading]);

  useEffect(() => {
    if (user) {
      user.getIdTokenResult().then((res) => {
        const claims = res.claims['https://hasura.io/jwt/claims'];
        if (claims) {
          setIsAnonymousGuardActive(true);
        } else {
          setIsAnonymousGuardActive(false);
          toast.error('You are not authorized to access this page');
          signOut(auth);
        }
      });
    }
  }, [user]);

  return loading ? (
    <Loading open={loading} setOpen={setLoading} />
  ) : user && isAnonymousGuardActive && !AuthLoading && !roleLoading && role ? (
    <NavComponent>
      <AccessControl role={role}>
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
