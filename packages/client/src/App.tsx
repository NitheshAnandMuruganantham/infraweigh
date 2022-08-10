import { Route, Routes } from 'react-router-dom';
import './App.css';
import Bills from './pages/bills';
import Login from './pages/login';
import RequireAuth from './pages/requireAuth';

function App() {
  return (
    <Routes>
      <Route element={<RequireAuth />}>
        <Route path="/" element={<Bills />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
