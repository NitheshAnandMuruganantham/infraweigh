import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
export interface User {
  id: string;
  email: string;
  role: string;
  tenent_id: string;
  weighbridge_id: string;
  email_verified: boolean;
  profile: any;
}

export interface RootObject {
  access_token: string;
  user: User;
}

function useUser(): [RootObject | null, boolean] {
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState<RootObject | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  React.useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        if (!localStorage.getItem('refresh_token')) {
          throw new Error('no token exists');
        } else {
          const dat = await fetch(
            import.meta.env['VITE_SERVER_URL'] + '/auth/refresh',
            {
              headers: {
                authorization:
                  'Bearer ' + localStorage.getItem('refresh_token'),
              },
              method: 'post',
            }
          );
          if (!dat.ok) {
            throw new Error('Error');
          }
          const data = await dat.json();
          sessionStorage.setItem('token', data.access_token);
          localStorage.setItem('refresh_token', data.refresh_token);
          setUser(data);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        sessionStorage.clear();
        localStorage.clear();
        navigate('/login', { replace: true });
        return;
      }
    };
    getUser();
  }, [location]);

  return [user, loading ? true : false];
}
export default useUser;
