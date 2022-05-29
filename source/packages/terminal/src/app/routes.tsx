import * as React from 'react';
import Loadable from 'react-loadable';
import Loader from './asyncLoader';
import { auth } from '@infra-weigh/firebase';
import Loading from '@infra-weigh/loading';
import { signOut } from 'firebase/auth';

const Terminal = Loadable({
  loader: () => import('./terminal/App'),
  loading: () => <Loader />,
});

const Customer = Loadable({
  loader: () => import('./customer/App'),
  loading: () => <Loader />,
});

const Admin = Loadable({
  loader: () => import('./admin/App'),
  loading: () => <Loader />,
});

const TenentAdmin = Loadable({
  loader: () => import('./tenentAdmin/App'),
  loading: () => <Loader />,
});

const RootRouter: React.FunctionComponent = () => {
  const [role, SetRole] = React.useState<null | string>(null);
  React.useEffect(() => {
    console.log('environment', process.env['NX_ENV']);
    console.log('firebase', process.env['NX_BASE_FIREBASE']);
    console.log('http address', process.env['NX_BASE_URL']);
    console.log('web socket address', process.env['NX_BASE_WS_URL']);
  }, []);
  React.useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged(async (user) => {
      user?.getIdTokenResult().then((dat) => {
        const clm: any = dat.claims['https://hasura.io/jwt/claims'];
        if (!clm) {
          alert('you are not authorized to access the resources');
          signOut(auth);
          window.location.replace('/');
        } else {
          console.log(clm['x-hasura-default-role']);
          SetRole(clm['x-hasura-default-role']);
        }
      });
    });
    return () => unregisterAuthObserver();
  }, []);
  if (!role) {
    return <Loading open={true} setOpen={() => null} />;
  } else {
    if (role === 'admin') {
      return <Admin />;
    } else if (role === 'terminal') {
      return <Terminal />;
    } else if (role === 'tenantAdmin') {
      return <TenentAdmin />;
    } else if (role === 'customer') {
      return <Customer />;
    } else {
      return (
        <div>
          <h1>nothing exists</h1>
          <button
            onClick={() => {
              auth.signOut();
              window.location.reload();
            }}
          >
            log out
          </button>
        </div>
      );
    }
  }
};

export default RootRouter;
