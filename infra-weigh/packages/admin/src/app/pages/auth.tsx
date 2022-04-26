import * as React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@infra-weigh/firebase';

const App: React.FunctionComponent<{
  children: React.ReactNode;
}> = (props) => {
  const [isSignedIn, setIsSignedIn] = React.useState<any>(false);

  React.useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged(async (user) => {
      await user?.getIdToken().then(async (token) => {
        localStorage.setItem('x-firebase-token', token);
        const idTokenResult = await user?.getIdTokenResult();
        const clm: any = idTokenResult.claims['https://hasura.io/jwt/claims'];
        if (clm['x-hasura-default-role'] !== 'admin') {
          alert('You are not authorized to access this page');
          await auth.signOut();
          window.location.reload();
        } else {
          setIsSignedIn(user);
        }
      });
    });
    return () => unregisterAuthObserver();
  }, []);

  if (!isSignedIn) {
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>ANAND INFRA WEIGH CO</h1>
        <h3 style={{ textAlign: 'center' }}>weighing terminal terminal</h3>
        <StyledFirebaseAuth
          uiConfig={{
            signInFlow: 'popup',
            signInOptions: [GoogleAuthProvider.PROVIDER_ID],
          }}
          firebaseAuth={auth}
        />
      </div>
    );
    // eslint-disable-next-line react/jsx-no-useless-fragment
  } else return <>{props.children}</>;
};

export default App;
