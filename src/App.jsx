import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import CityPage from "./pages/CityPage";
import CreateEvent from "./pages/CreateEvent";
import Login from "./pages/Login";
import EventDetails from "./pages/EventDetails";
import { AlertProvider } from "./components/AlertAndLoader/Alert";
import { AuthProvider } from "./components/Auth/AuthContext";
function App() {
  return (
    <Router>
      <AuthProvider>
        <AlertProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/city/:citySlug" element={<CityPage />} />
            <Route path="/event/:eventId" element={<EventDetails />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/login" element={<Login />} />
            {/* Add more routes here if needed, e.g., <Route path="/city/:id" element={<CityPage />} /> for dynamic cities */}
          </Routes>
        </AlertProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
