import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CityPage from "./pages/CityPage";
import CreateEvent from "./pages/CreateEvent";
import Login from "./pages/Login";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Profile from "./pages/profile";
import InfoPage from "./pages/InfoPage";
import OrganiserProfile from "./pages/OrganiserProfile";
import { AlertProvider } from "./components/AlertAndLoader/Alert";
import { AuthProvider } from "./components/Auth/AuthContext";
import VisitTracker from "./utils/visitTracker";
import BlogList from "./pages/BlogList";
import HomePage from "./pages/Home";
import BlogDetails from "./pages/BlogDetails";
import ComingSoon from "./pages/ComingSoon";

function App() {
  return (
    <Router>
      <AuthProvider>
        <AlertProvider>
          <VisitTracker />
          <Routes>
            <Route path="/" element={<ComingSoon />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/events" element={<Events />} />
            <Route path="/city/:citySlug" element={<CityPage />} />
            <Route path="/event/:eventId" element={<EventDetails />} />
            <Route path="/organiser/:id" element={<OrganiserProfile />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogDetails />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/info/:page" element={<InfoPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            {/* Add more routes here if needed, e.g., <Route path="/city/:id" element={<CityPage />} /> for dynamic cities */}
          </Routes>
        </AlertProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
