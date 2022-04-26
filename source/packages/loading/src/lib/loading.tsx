import * as React from 'react';
import './loading.module.scss';
interface LoaderProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Loader: React.FunctionComponent<LoaderProps> = ({ open, setOpen }) => {
  return (
    <div
      style={{
        visibility: open ? 'visible' : 'hidden',
      }}
      className="overlay"
    >
      <div className="overlay__inner">
        <div className="overlay__content">
          <span className="spinner"></span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
