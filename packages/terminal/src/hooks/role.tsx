import * as React from 'react';
import jwt_decode from 'jwt-decode';
import { useLocation } from 'react-router-dom';
type roles = 'admin' | 'terminal' | 'tenantAdmin' | null | 'maintainer';

function useRoles(): [roles, boolean] {
  const [loading, setLoading] = React.useState(true);
  const [role, setRole] = React.useState<roles | null>(null);
  const location = useLocation();

  React.useEffect(() => {
    const loadRole = async () => {
      setLoading(true);
      const idTokenResult: any = await jwt_decode(
        sessionStorage.getItem('token') || ''
      );
      const claims: any = idTokenResult['https://hasura.io/jwt/claims'];
      setRole(claims ? claims['x-hasura-default-role'] : 'guest');
      setLoading(false);
    };
    loadRole();
  }, [location]);

  return [role, loading ? true : false];
}
export default useRoles;
