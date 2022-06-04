import * as React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@infra-weigh/firebase';
type roles = 'admin' | 'terminal' | 'customer' | 'tenantAdmin' | null | 'guest';

function useAuth(): [roles, boolean] {
  const [loading, setLoading] = React.useState(true);
  const [role, setRole] = React.useState<roles | null>(null);
  const [user, AuthLoading] = useAuthState(auth);

  React.useEffect(() => {
    const loadRole = async () => {
      setLoading(true);
      const idTokenResult = await user?.getIdTokenResult();
      const claims =
        idTokenResult?.claims['https://hasura.io/jwt/claims'] || 'guest';
      setRole(claims ? claims['x-hasura-default-role'] : 'guest');
      setLoading(false);
    };
    loadRole();
  }, [user]);

  return [role, loading || AuthLoading ? true : false];
}
export default useAuth;
