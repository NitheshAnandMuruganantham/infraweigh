import { Backdrop, CircularProgress } from '@mui/material';
import * as React from 'react';
interface LoaderProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Loader: React.FunctionComponent<LoaderProps> = ({ open, setOpen }) => {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loader;
