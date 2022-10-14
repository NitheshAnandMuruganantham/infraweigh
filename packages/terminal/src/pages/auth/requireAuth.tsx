import { FunctionComponent, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import NavComponent from '../../components/nav';
import AccessControl from './accessControl';
import Loading from '../../components/loading';
import useUser from '../../hooks/user';
import Fab from '@mui/material/Fab';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import Support from '../support';

const RequireAuth: FunctionComponent = () => {
  const location = useLocation();
  const [user, AuthLoading] = useUser();
  const navigate = useNavigate();
  const [openSupport, SetOpenSupport] = useState(false);

  return AuthLoading ? (
    <Loading open={AuthLoading} setOpen={() => null} />
  ) : !AuthLoading && user ? (
    <NavComponent>
      <Support open={openSupport} setOpen={SetOpenSupport} />
      <Fab
        onClick={() => SetOpenSupport(true)}
        variant="extended"
        style={{
          zIndex: 1000,
          position: 'fixed',
          bottom: '30px',
          right: '30px',
        }}
        color="success"
        aria-label=""
      >
        <SupportAgentIcon sx={{ mr: 1 }} /> SUPPORT
      </Fab>
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
