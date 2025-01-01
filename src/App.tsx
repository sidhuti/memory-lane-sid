import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import MemoryLane from './pages/MemoryLane';
import './App.css';

function App() {
  return (
      <Router>
        <GlobalStyles />
        <Routes>
          <Route path="/" element={
              <MemoryLane />
        } />
        </Routes>
      </Router>
  );
}

export default App;
