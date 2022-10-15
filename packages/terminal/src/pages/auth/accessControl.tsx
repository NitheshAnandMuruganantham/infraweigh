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
    alert('You are not authorized to access this page');
    return <Navigate to="/" replace />;
  }
};

const acc = [
  {
    path: '/clients',
    role: ['terminal', 'tenantAdmin', 'maintainer'],
  },
  {
    path: '/finance',
    role: ['tenantAdmin'],
  },
  {
    path: '/tenants',
    role: ['admin', 'maintainer'],
  },
  {
    path: '/weigh',
    role: ['terminal'],
  },
  {
    path: '/maintainers',
    role: ['admin'],
  },
  {
    path: '/queries',
    role: ['maintainer'],
  },
  {
    path: '/weighbridges',
    role: ['admin', 'tenantAdmin', 'maintainer'],
  },
  {
    path: '/users',
    role: ['admin', 'tenantAdmin', 'maintainer'],
  },
];

export default AccessControl;
