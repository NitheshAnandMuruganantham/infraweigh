import { CircularProgress } from '@mui/material';
import * as React from 'react';

interface CounterCardProps {
  count: any;
  label: string;
  loading: boolean;
}

const CounterCard: React.FunctionComponent<CounterCardProps> = ({
  count,
  label,
  loading,
}) => {
  return (
    <div
      style={{
        color: 'black',
        height: '150px',
        flexDirection: 'column',
        width: '24%',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'whitesmoke',
        borderRadius: '10px',
      }}
    >
      {loading ? (
        <CircularProgress color="inherit" />
      ) : (
        <>
          <div style={{ marginBottom: '10px', fontSize: 'large' }}>
            <b>{label}</b>
          </div>
          <div style={{ fontSize: '50px' }}>{count}</div>
        </>
      )}
    </div>
  );
};

export default CounterCard;