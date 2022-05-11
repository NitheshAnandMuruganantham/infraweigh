import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import ResponsiveAppBar from './components/appBar';
import Clients from './pages/clients';
import Weighbrdiges from './pages/weighments';
import Users from './pages/users';

const App: React.FunctionComponent = () => {
  return (
    <ResponsiveAppBar>
      <Routes>
        <Route path="/" element={<Clients />} />
        <Route path="/weighbridges" element={<Weighbrdiges />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </ResponsiveAppBar>
  );
};

export default App;
