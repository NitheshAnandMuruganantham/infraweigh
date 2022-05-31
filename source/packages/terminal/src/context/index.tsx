import * as React from 'react';
import { auth } from '@infra-weigh/firebase';
import { User } from 'firebase/auth';
import { UserContext } from './auth';

interface ContextProps {
  children: React.ReactNode;
}

const ContextInjector: React.FunctionComponent<ContextProps> = ({
  children,
}) => {
  const [user, SetUser] = React.useState<any>();
  const [claims, SetClaims] = React.useState<any>();
  React.useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged(async (user) => {
      SetUser(user);
      if (user) {
        await SetClaims(
          async () =>
            (
              await user.getIdTokenResult()
            ).claims['https://hasura.io/jwt/claims']
        );
      }
    });
    return () => unregisterAuthObserver();
  }, []);
  return (
    <UserContext.Provider value={[user, claims]}>
      {children}
    </UserContext.Provider>
  );
};

export default ContextInjector;
