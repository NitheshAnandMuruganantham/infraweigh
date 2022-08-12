import { FunctionComponent, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import NavComponent from '../../components/nav';
import AccessControl from './accessControl';
import Loading from '../../components/loading';
import useUser from '../../hooks/user';

const RequireAuth: FunctionComponent = () => {
  const location = useLocation();
  const [user, AuthLoading] = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const id = setInterval(async () => {
      try {
        if (!localStorage.getItem('refresh_token')) {
          throw new Error('no tokens exists in not req auth');
        } else {
          const request = await fetch(
            import.meta.env['VITE_SERVER_URL'] + '/auth/refresh',
            {
              headers: {
                authorization:
                  'Bearer ' + localStorage.getItem('refresh_token'),
              },
              method: 'post',
            }
          );
          if (request.ok) {
            const data = await request.json();
            sessionStorage.setItem('token', data.access_token);
            localStorage.setItem('refresh_token', data.refresh_token);
          } else {
            throw new Error('un authorized');
          }
        }
      } catch (err) {
        console.log(err);
        sessionStorage.clear();
        localStorage.clear();
        navigate('/login');
      }
    }, 50000);
    return () => clearInterval(id);
  }, []);

  return AuthLoading ? (
    <Loading open={AuthLoading} setOpen={() => null} />
  ) : !AuthLoading && user ? (
    <NavComponent>
      <AccessControl role={user.user.role}>
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
