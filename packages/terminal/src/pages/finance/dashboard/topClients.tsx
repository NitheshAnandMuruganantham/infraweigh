import * as React from 'react';

interface TopClientsProps {}

const TopClients: React.FunctionComponent<TopClientsProps> = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '30%',
        marginLeft: '10px',
        backgroundColor: 'whitesmoke',
        borderRadius: '10px',
        borderColor: 'gray',
        alignItems: 'center',
        color: 'gray',
      }}
    >
      <div style={{ marginTop: '10px', marginBottom: '10px' }}>
        <b>top performing clients</b>
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
          <span style={{ width: '100%' }}>#001 - anand traders - $ 3000</span>
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
          <span style={{ width: '100%' }}>#002 - anand steels - $ 2000</span>
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

export default TopClients;
