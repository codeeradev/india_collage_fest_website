import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import PropTypes from "prop-types";
import { useEffect } from "react";

/* Handles map recenter */
const RecenterMap = ({ coords }) => {
  const map = useMap();

  useEffect(() => {
    if (coords) {
      map.setView(coords, 13, { animate: true });
    }
  }, [coords, map]);

  return null;
};

const ClickHandler = ({ onChange }) => {
  useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng;

      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await res.json();

      onChange({
        lat,
        lng,
        address: data.display_name || "",
      });
    },
  });

  return null;
};

const MapPicker = ({ value, onChange }) => {
  return (
    <MapContainer
      center={{ lat: 28.6139, lng: 77.209 }} // default once
      zoom={13}
      scrollWheelZoom
      style={{ height: "350px", width: "100%" }}
    >
      <TileLayer
        attribution="© OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* 👇 THIS IS THE FIX */}
      <RecenterMap coords={value} />

      {value && <Marker position={value} />}

      <ClickHandler onChange={onChange} />
    </MapContainer>
  );
};

MapPicker.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func.isRequired,
};

export default MapPicker;
