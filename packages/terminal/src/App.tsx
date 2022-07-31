import * as React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";
import Loading from "./components/loading";
import RequireAuth from "./pages/auth/requireAuth";
import SignInSide from "./pages/auth/logIn";

const ForgetPassword = React.lazy(() => import("./pages/auth/forgetPassword"));
const SetNewPassword = React.lazy(() => import("./pages/auth/setPassword"));
const Bills = React.lazy(() => import("./pages/bills"));
const Clients = React.lazy(() => import("./pages/clients"));
const Weigh = React.lazy(() => import("./pages/weigh"));
const Users = React.lazy(() => import("./pages/users"));
const Tenants = React.lazy(() => import("./pages/tenents"));
const Weighbridges = React.lazy(() => import("./pages/weignbirdge"));

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

const App: React.FunctionComponent = () => {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route element={<RequireAuth />}>
        <Route path="/" element={<Home />} />
        <Route path="/weighbridges" element={<LazyWeighbridges />} />
        <Route path="/users" element={<LazyUsers />} />
        <Route path="/weigh" element={<LazyWeigh />} />
        <Route path="/bills" element={<LazyBills />} />
        <Route path="/tenants" element={<LazyTenants />} />
        <Route path="/clients" element={<LazyClients />} />
      </Route>
      <Route path="/login" element={<SignInSide />} />
      <Route path="/forgetPassword" element={<LazyForgetPassword />} />
      <Route path="/reset-password" element={<LazySetNewPassword />} />
    </Routes>
  );
};

export default App;

const NotFound = () => <Navigate to="/" replace />;
