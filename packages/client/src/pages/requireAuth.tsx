import { FunctionComponent, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import NavComponent from '../components/nav';
import Loading from '../components/loading';
import useUser from '../hooks/user';
import Fab from '@mui/material/Fab';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import Support from './support';

const RequireAuth: FunctionComponent = () => {
  const [user, AuthLoading] = useUser();
  const [openSupport, SetOpenSupport] = useState(false);
  return AuthLoading ? (
    <Loading open={AuthLoading} setOpen={() => {}} />
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
      <Outlet />
    </NavComponent>
  ) : (
    <Navigate to={'/login'} replace />
  );
};

export default RequireAuth;
