import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "leaflet/dist/leaflet.css";
import "./utils/leafletIconFix";
import "./_next/static/css/26398bc4a277141a.css";
import "./_next/static/css/f5a9c8ceb4e7ce78.css";
import "./styles/index.css";
import { CityProvider } from "./context/CityContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CityProvider>
      <App />
    </CityProvider>
  </React.StrictMode>,
);
