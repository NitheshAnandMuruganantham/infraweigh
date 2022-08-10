import { User } from 'firebase/auth';
import * as React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';

function useUser(): [User | null | undefined, boolean] {
  const [loading, setLoading] = React.useState(true);
  const [user, userLoading] = useAuthState(auth);
  const location = useLocation();
  const navigate = useNavigate();
  React.useEffect(() => {
    const getUser = async () => {
      if (!userLoading) {
        try {
          setLoading(true);
          if (!auth.currentUser?.uid) {
            throw new Error('no user exists');
          }
          const idToken: any = await auth.currentUser?.getIdToken();
          const dat = await fetch(
            import.meta.env['VITE_SERVER_URL'] + '/auth/refresh/firebase',
            {
              headers: {
                authorization: idToken,
              },
              method: 'post',
            }
          );
          if (!dat.ok) {
            throw new Error('Error');
          }
          const data = await dat.text();
          sessionStorage.setItem('token', data);
          setLoading(false);
        } catch (error) {
          console.log(error);
          await auth.signOut().catch();
          setLoading(false);
          sessionStorage.clear();
          navigate('/login', { replace: true });
          return;
        }
      }
    };
    getUser();
  }, [location, userLoading]);

  return [user, loading || userLoading ? true : false];
}
export default useUser;
