import * as React from 'react';
import { auth } from '@infra-weigh/firebase';
import { UserContext } from './auth';

interface ContextProps {
  children: React.ReactNode;
}

const ContextInjector: React.FunctionComponent<ContextProps> = ({
  children,
}) => {
  const [user, SetUser] = React.useState<any>();
  React.useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged((user) => {
      SetUser(user);
    });
    return () => unregisterAuthObserver();
  }, []);
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default ContextInjector;
