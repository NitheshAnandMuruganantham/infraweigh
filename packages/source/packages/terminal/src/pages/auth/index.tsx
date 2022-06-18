import * as React from 'react';
import { auth } from '@infra-weigh/firebase';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from '@infra-weigh/loading';
import Page from './page';
const AuthPage: React.FunctionComponent = () => {
  const [canLoadLogin, setCanLoadLogin] = React.useState(false);
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!user && !loading) {
      setCanLoadLogin(true);
    } else if (!loading) {
      navigate('/');
    }
  }, [user, loading]);

  return canLoadLogin && !loading ? (
    <Page />
  ) : (
    <Loading open={true} setOpen={() => null} />
  );
};

export default AuthPage;
