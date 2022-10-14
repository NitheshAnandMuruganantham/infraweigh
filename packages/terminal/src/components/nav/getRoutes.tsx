import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const GetHeaderNames = () => {
  const location = useLocation();
  const [path, setPath] = useState<string>('');

  useEffect(() => {
    setPath(
      locationNames.find((dat) => dat.path === location.pathname)?.name || ''
    );
  }, [location]);

  return (
    <Typography variant="h6" noWrap component="div">
      {path}
    </Typography>
  );
};

const locationNames = [
  {
    path: '/',
    name: 'Manage Bills',
  },
  {
    path: '/weighbridges',
    name: 'Manage Weighbridges',
  },
  {
    path: '/queries',
    name: 'Manage And Resolve Queries',
  },
  {
    path: '/finance',
    name: 'Finance dashboard',
  },
  {
    path: '/weigh',
    name: 'Weighment Terminal',
  },
  {
    path: '/users',
    name: 'Manage Users',
  },
  {
    path: '/tenants',
    name: 'Manage Tenants',
  },
  {
    path: '/clients',
    name: 'Manage Buyer Seller And Traders',
  },
  {
    path: '/maintainers',
    name: 'Manage Service Engineers',
  },
  {
    path: '/login',
    name: 'Login To Continue',
  },
  {
    path: '/forgetPassword',
    name: 'Enter Email To Reset Password',
  },
  {
    path: '/reset-password',
    name: 'Enter Password To Continue',
  },
];

export default GetHeaderNames;
