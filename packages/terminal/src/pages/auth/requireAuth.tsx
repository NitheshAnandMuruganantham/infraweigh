import { FunctionComponent, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";
import { Navigate } from "react-router-dom";
import NavComponent from "../../components/nav";
import AccessControl from "./accessControl";
import useRole from "../../hooks/role";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import Loading from "../../components/loading";

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

  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      user
        .getIdTokenResult()
        .then((res) => {
          const claims = res.claims["https://hasura.io/jwt/claims"];
          if (claims) {
            setIsAnonymousGuardActive(true);
          } else {
            setIsAnonymousGuardActive(false);
            navigate("/unknown", { replace: true });
          }
        })
        .catch((err) => {
          console.log(err);
          setIsAnonymousGuardActive(false);
          toast.error("Error while fetching user claims");
          signOut(auth);
        });
    }
  }, [user]);

  return loading || AuthLoading || roleLoading ? (
    <Loading open={loading} setOpen={setLoading} />
  ) : !loading &&
    !AuthLoading &&
    !roleLoading &&
    user &&
    role &&
    isAnonymousGuardActive ? (
    <NavComponent>
      <AccessControl role={role}>
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
