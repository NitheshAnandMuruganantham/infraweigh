import * as React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { auth } from '@infra-weigh/firebase';
import { EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from '@infra-weigh/loading';
const AuthPage: React.FunctionComponent = () => {
  const location: any = useLocation();
  const [canLoadLogin, setCanLoadLogin] = React.useState(false);
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!user && !loading) {
      setCanLoadLogin(true);
    } else if (!loading) {
      navigate('/');
    }
  }, [navigate, user, loading]);

  return canLoadLogin && !loading ? (
    <StyledFirebaseAuth
      uiConfig={{
        signInFlow: 'popup',
        adminRestrictedOperation: {
          adminEmail: 'anand@infraweigh.co',
          helpLink: 'https://infraweigh.co',
          status: true,
        },
        signInSuccessUrl: location?.state?.from?.pathname || '/',
        siteName: 'Infraweigh.co WeighBridge automation',
        privacyPolicyUrl: 'https://infraweigh.co/privacy-policy',
        signInOptions: [
          EmailAuthProvider.PROVIDER_ID,
          GoogleAuthProvider.PROVIDER_ID,
        ],
      }}
      firebaseAuth={auth}
    />
  ) : (
    <Loading open={true} setOpen={() => null} />
  );
};

export default AuthPage;
