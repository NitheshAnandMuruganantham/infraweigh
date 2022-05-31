import { User } from 'firebase/auth';
import * as React from 'react';

export const UserContext = React.createContext<[User | null, any]>([null, {}]);
