import { useEffect, useState } from "react";
import {
  Snackbar,
  Alert,
  CircularProgress,
  Backdrop,
  Fade,
  Typography,
  Box,
} from "@mui/material";
import { registerGlobalAlert } from "./UIComponents";

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    open: false,
    type: "info",
    message: "",
    duration: 3000,
  });

  // 🔗 Register global setter ONCE
  useEffect(() => {
    registerGlobalAlert(setAlert);
  }, []);

  const handleClose = (_, reason) => {
    if (reason === "clickaway") return;
    setAlert((prev) => ({ ...prev, open: false }));
  };

  return (
    <>
      {children}

      {/* 🔔 NORMAL ALERTS (success / error / warning / info) */}
      <Snackbar
        open={alert.open && alert.type !== "loading"}
        autoHideDuration={alert.duration}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        TransitionComponent={Fade}
      >
        <Alert
          severity={alert.type}
          variant="filled"
          elevation={6}
          onClose={handleClose}
          sx={{
            fontSize: "0.95rem",
            borderRadius: "10px",
            minWidth: "280px",
            boxShadow: 3,
          }}
        >
          {alert.message}
        </Alert>
      </Snackbar>

      {/* ⏳ GLOBAL FULLSCREEN LOADER */}
      <Backdrop
        open={alert.open && alert.type === "loading"}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 100,
          backdropFilter: "blur(6px)",
          background: "rgba(255, 255, 255, 0.6)",
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          p={4}
          borderRadius="16px"
          sx={{
            background: "#fff",
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          }}
        >
          <CircularProgress
            size={56}
            thickness={4.5}
            sx={{ mb: 2 }}
          />
          <Typography variant="h6" fontWeight={500}>
            {alert.message || "Processing... Please wait"}
          </Typography>
        </Box>
      </Backdrop>
    </>
  );
};
