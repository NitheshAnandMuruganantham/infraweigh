import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Bills from './pages/bills';
import Home from './pages/home';
import ResponsiveAppBar from './components/appBar';
import Clients from './pages/clients';
import Weighbrdiges from './pages/weighbridges';

const App: React.FunctionComponent = () => {
  return (
    <ResponsiveAppBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/report" element={<Bills />} />
        <Route path="/weighbridges" element={<Weighbrdiges />} />
        <Route path="/clients" element={<Clients />} />
      </Routes>
    </ResponsiveAppBar>
  );
};

export default App;
