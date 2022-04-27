import * as React from 'react';
import { Bars } from 'react-loader-spinner';
interface LoaderProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Loader: React.FunctionComponent<LoaderProps> = ({ open, setOpen }) => {
  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 15000,
        top: 0,
        left: 0,
        height: '100vh',
        width: '100vw',
      }}
    >
      <Bars
        wrapperStyle={{
          position: 'absolute',
          top: '45%',
          left: '45%',
        }}
        visible={open}
        height="100"
        width="100"
        color="grey"
        ariaLabel="loading-indicator"
      />
    </div>
  );
};

export default Loader;
