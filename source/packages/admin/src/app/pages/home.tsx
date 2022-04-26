import * as React from 'react';
const Home: React.FunctionComponent = () => {
  return (
    <div>
      <h1>{process.env['NX_BASE_URL']}</h1>
    </div>
  );
};

export default Home;
