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
    path: '/bills',
    name: 'Manage Bills',
  },
  {
    path: '/',
    name: 'Dashboard',
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
