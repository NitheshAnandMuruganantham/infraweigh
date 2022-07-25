import { FunctionComponent, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import NavComponent from "../../components/nav";
import AccessControl from "./accessControl";
import Loading from "../../components/loading";
import useUser from "../../hooks/user";

const RequireAuth: FunctionComponent = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [user, AuthLoading] = useUser();
  useEffect(() => {
    if (AuthLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [AuthLoading]);

  return loading || AuthLoading ? (
    <Loading open={loading} setOpen={setLoading} />
  ) : !loading && !AuthLoading && user ? (
    <NavComponent>
      <AccessControl role={user.user.role}>
        <Outlet />
      </AccessControl>
    </NavComponent>
  ) : (
    <Navigate
      to={"/login"}
      replace
      state={{
        from: location.pathname,
      }}
    />
  );
};

export default RequireAuth;
