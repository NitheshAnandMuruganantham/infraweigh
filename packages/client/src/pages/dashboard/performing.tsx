import * as React from 'react';

interface TopPerformingProps {}

const TopPerforming: React.FunctionComponent<TopPerformingProps> = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '25%',
        backgroundColor: 'whitesmoke',
        borderRadius: '10px',
        borderColor: 'gray',
        alignItems: 'center',
        color: 'gray',
      }}
    >
      <div style={{ marginTop: '10px', marginBottom: '10px' }}>
        <b>top performing branches</b>
      </div>
      <div style={{ width: '80%', height: '1px', backgroundColor: 'black' }} />
      <div
        style={{
          display: 'flex',
          textAlign: 'center',
          flexDirection: 'column',
          width: '95%',
          overflowY: 'auto',
          marginTop: '10px',
        }}
      >
        <div style={{ marginTop: '10px' }}>
          <span style={{ width: '100%' }}>#001 - madathukulam - $ 10000</span>
          <div
            style={{
              width: '90%',
              marginRight: 'auto',
              marginLeft: 'auto',
              marginTop: '7px',
              height: '1px',
              backgroundColor: 'black',
            }}
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <span style={{ width: '100%' }}>#002 - vayalur - $ 10000</span>
          <div
            style={{
              width: '90%',
              marginRight: 'auto',
              marginLeft: 'auto',
              marginTop: '7px',
              height: '1px',
              backgroundColor: 'black',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TopPerforming;
