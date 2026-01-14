import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import CityPage from './pages/CityPage';
import CreateEvent from "./pages/CreateEvent";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/city/chennai" element={<CityPage />} />
        <Route path="/create-event" element={<CreateEvent />} />
        {/* Add more routes here if needed, e.g., <Route path="/city/:id" element={<CityPage />} /> for dynamic cities */}
      </Routes>
    </Router>
  );
}

export default App;