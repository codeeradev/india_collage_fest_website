import { createContext, useCallback, useContext, useMemo, useState } from "react";

const CityContext = createContext();

export const CityProvider = ({ children }) => {

  // ===============================
  // READ CITY FROM COOKIE
  // ===============================
  const getCityFromCookie = () => {
    const match = document.cookie
      .split("; ")
      .find((row) => row.startsWith("selected_city="));

    if (!match) return null;

    try {
      return JSON.parse(
        decodeURIComponent(match.split("=")[1])
      );
    } catch {
      return null;
    }
  };

  // ===============================
  // STATE INIT FROM COOKIE
  // ===============================
  const [city, setCity] = useState(getCityFromCookie);

  // ===============================
  // UPDATE CITY + WRITE COOKIE
  // ===============================
  const updateCity = useCallback((cityObj) => {
    document.cookie = `selected_city=${encodeURIComponent(
      JSON.stringify(cityObj)
    )}; path=/; max-age=2592000`; // 30 days

    setCity(cityObj);
  }, []);

  const contextValue = useMemo(
    () => ({ city, setCity: updateCity }),
    [city, updateCity]
  );

  return (
    <CityContext.Provider
      value={contextValue}
    >
      {children}
    </CityContext.Provider>
  );
};

export const useCity = () => useContext(CityContext);
