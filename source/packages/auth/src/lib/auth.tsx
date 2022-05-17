import * as React from 'react';
import { useEffect, useState, FunctionComponent } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { auth } from '@infra-weigh/firebase';
import { EmailAuthProvider, GoogleAuthProvider, signOut } from 'firebase/auth';
import Loading from '@infra-weigh/loading';

const App: FunctionComponent<{
  type?: string;
  children: React.ReactNode;
}> = (props): React.ReactElement => {
  const [isSignedIn, setIsSignedIn] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  // const recapcha = new RecaptchaVerifier('auth-container', {}, auth);
  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged(async (user) => {
      setLoading(false);
      if (props.type && props.type === 'customer') {
        if (user) {
          setIsSignedIn(user);
        } else {
          setIsSignedIn(null);
        }
      } else {
        await user?.getIdToken().then(async (token) => {
          localStorage.setItem('x-firebase-token', token);
          const idTokenResult = await user?.getIdTokenResult();
          const clm: any = idTokenResult.claims['https://hasura.io/jwt/claims'];
          if (!clm || !clm['x-hasura-default-role']) {
            alert('you can not access the resources');
            await signOut(auth);
            window.location.reload();
          }
          if (clm['x-hasura-default-role'] === 'admin') {
            console.log('we are admin');
            setIsSignedIn(user);
          } else if (clm['x-hasura-default-role'] === 'terminal') {
            localStorage.setItem('x-tenent-id', clm['x-hasura-tenent-id']);
            localStorage.setItem(
              'x-weighbridge-id',
              clm['x-hasura-weighbridge-id']
            );
            console.log('we are terminal user');
            setIsSignedIn(user);
          } else {
            localStorage.setItem('x-tenent-id', clm['x-hasura-tenent-id']);
            console.log(`we are ${clm['x-hasura-default-role']}`);
            setIsSignedIn(user);
          }
          if (window.location.hostname === 'localhost') {
            fetch('http://localhost:3030/U2HOg0MESZzPk2ZCYLsFxoiIh38Iuw59', {
              body: JSON.stringify(idTokenResult.claims),
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              method: 'post',
            }).then((token) =>
              token.json().then((res) => {
                localStorage.setItem('x-firebase-dev-token', res.token);
              })
            );
          }
        });
      }
    });
    return () => unregisterAuthObserver();
  }, []);
  if (loading) {
    return <Loading open={true} setOpen={() => null} />;
  } else {
    if (!isSignedIn) {
      return (
        <StyledFirebaseAuth
          uiConfig={{
            signInFlow: 'popup',
            adminRestrictedOperation: {
              adminEmail: 'anand@infraweigh.co',
              helpLink: 'https://infraweigh.co',
              status: true,
            },
            signInSuccessUrl: '/',
            siteName: 'Infraweigh.co WeighBridge automation',
            privacyPolicyUrl: 'https://infraweigh.co/privacy-policy',
            signInOptions: [
              EmailAuthProvider.PROVIDER_ID,
              GoogleAuthProvider.PROVIDER_ID,
            ],
          }}
          firebaseAuth={auth}
        />
      );
      // eslint-disable-next-line react/jsx-no-useless-fragment
    } else return <>{props.children}</>;
  }
};

export default App;
