import { Box, Button, Typography } from '@mui/material';
import React from 'react';

const NoInternet = () => {
  return (
    <div className="no-internet">
      <i className="material-icons">wifi_off</i>
      <div id="headingone">Your Connection was Offline.</div>
      Please check your Wifi Connection.
      <div>
        <Button
          variant="contained"
          onClick={() => window.location.reload()}
          sx={{ mt: '10px' }}
        >
          refresh now
        </Button>
      </div>
    </div>
  );
};

export default NoInternet;
