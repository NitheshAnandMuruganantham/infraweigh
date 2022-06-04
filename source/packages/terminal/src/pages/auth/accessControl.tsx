import * as React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface AccessControlProps {
  role: string;
  children: React.ReactNode;
}

const AccessControl: React.FunctionComponent<AccessControlProps> = ({
  role,
  children,
}) => {
  const { pathname } = useLocation();

  if (
    acc.filter((r) => r.path === pathname && r.role.includes(role)).length >
      0 ||
    pathname === '/'
  ) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
  } else {
    return <Navigate to="/" replace />;
  }
};

const acc = [
  {
    path: '/clients',
    role: ['terminal', 'tenantAdmin'],
  },
  {
    path: '/tenants',
    role: ['admin'],
  },
  {
    path: '/weigh',
    role: ['terminal'],
  },
  {
    path: '/bills',
    role: ['admin', 'terminal', 'tenantAdmin', 'customer'],
  },
  {
    path: '/weighbridges',
    role: ['admin', 'tenantAdmin'],
  },
  {
    path: '/users',
    role: ['admin', 'tenantAdmin'],
  },
];

export default AccessControl;
