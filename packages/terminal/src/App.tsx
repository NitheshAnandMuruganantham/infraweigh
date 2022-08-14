import * as React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Loading from './components/loading';
import SignInSide from './pages/auth/logIn';
import NotRequireAuth from './pages/auth/notRequireAuth';
import RequireAuth from './pages/auth/requireAuth';
import NoInternet from './pages/NoInternet';

const ForgetPassword = React.lazy(() => import('./pages/auth/forgetPassword'));
const SetNewPassword = React.lazy(() => import('./pages/auth/setPassword'));
const Bills = React.lazy(() => import('./pages/bills'));
const Clients = React.lazy(() => import('./pages/clients'));
const Weigh = React.lazy(() => import('./pages/weigh'));
const Users = React.lazy(() => import('./pages/users'));
const Tenants = React.lazy(() => import('./pages/tenents'));
const Weighbridges = React.lazy(() => import('./pages/weignbirdge'));
const Maintainers = React.lazy(() => import('./pages/maintainers'));

const LazyLoader = () => <Loading open={true} setOpen={() => null} />;

const LazyForgetPassword = () => (
  <React.Suspense fallback={<LazyLoader />}>
    <ForgetPassword />
  </React.Suspense>
);

const LazySetNewPassword = () => (
  <React.Suspense fallback={<LazyLoader />}>
    <SetNewPassword />
  </React.Suspense>
);
const LazyBills = () => (
  <React.Suspense fallback={<LazyLoader />}>
    <Bills />
  </React.Suspense>
);
const LazyClients = () => (
  <React.Suspense fallback={<LazyLoader />}>
    <Clients />
  </React.Suspense>
);
const LazyWeigh = () => (
  <React.Suspense fallback={<LazyLoader />}>
    <Weigh />
  </React.Suspense>
);
const LazyUsers = () => (
  <React.Suspense fallback={<LazyLoader />}>
    <Users />
  </React.Suspense>
);
const LazyTenants = () => (
  <React.Suspense fallback={<LazyLoader />}>
    <Tenants />
  </React.Suspense>
);
const LazyWeighbridges = () => (
  <React.Suspense fallback={<LazyLoader />}>
    <Weighbridges />
  </React.Suspense>
);
const LazyMaintainers = () => (
  <React.Suspense fallback={<LazyLoader />}>
    <Maintainers />
  </React.Suspense>
);

const App: React.FunctionComponent = () => {
  const [offline, SetOffline] = React.useState(!navigator.onLine);

  React.useEffect(() => {
    window.addEventListener('online', () => SetOffline(false));
    window.addEventListener('offline', () => SetOffline(true));

    return () => {
      window.removeEventListener('online', () => SetOffline(false));
      window.removeEventListener('offline', () => SetOffline(true));
    };
  }, []);
  if (offline) {
    return (
      <>
        <NoInternet />
      </>
    );
  } else {
    return (
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route element={<RequireAuth />}>
          <Route path="/" element={<LazyBills />} />
          <Route path="/weighbridges" element={<LazyWeighbridges />} />
          <Route path="/users" element={<LazyUsers />} />
          <Route path="/weigh" element={<LazyWeigh />} />
          <Route path="/tenants" element={<LazyTenants />} />
          <Route path="/clients" element={<LazyClients />} />
          <Route path="/maintainers" element={<LazyMaintainers />} />
        </Route>
        <Route element={<NotRequireAuth />}>
          <Route path="/login" element={<SignInSide />} />
          <Route path="/forgetPassword" element={<LazyForgetPassword />} />
          <Route path="/reset-password" element={<LazySetNewPassword />} />
        </Route>
      </Routes>
    );
  }
};

export default App;

const NotFound = () => <Navigate to="/" replace />;
