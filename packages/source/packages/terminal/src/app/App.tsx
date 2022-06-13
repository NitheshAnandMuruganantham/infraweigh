import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Bills from '../pages/bills';
import Home from '../pages/home';
import Clients from '../pages/clients';
import RequireAuth from '../pages/auth/requireAuth';
import LogIn from '../pages/auth';
import Weigh from '../pages/weigh';
import Users from '../pages/users';
import Tenants from '../pages/tenents';
import Weighbridges from '../pages/weignbirdge';
const App: React.FunctionComponent = () => {
  return (
    <Routes>
      <Route element={<RequireAuth />}>
        <Route path="/" element={<Home />} />
        <Route path="/weighbridges" element={<Weighbridges />} />
        <Route path="/users" element={<Users />} />
        <Route path="/weigh" element={<Weigh />} />
        <Route path="/bills" element={<Bills />} />
        <Route path="/tenants" element={<Tenants />} />
        <Route path="/clients" element={<Clients />} />
      </Route>
      <Route path="/login" element={<LogIn />} />
    </Routes>
  );
};

export default App;
