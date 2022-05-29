import { Route, Routes } from 'react-router-dom';
import Home from './screens/home';
import './app.module.scss';
import Nav from './components/navBar';
export function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
