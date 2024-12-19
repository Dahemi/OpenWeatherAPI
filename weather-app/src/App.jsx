import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, Paper, Typography } from "@mui/material";
import WeatherForm from "./components/WeatherForm";
import WeatherResult from "./components/WeatherResult";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2196F3",
    },
    secondary: {
      main: "#21CBF3",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
          },
        },
      },
    },
  },
});

const App = () => {
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (city) => {
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("City not found");

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #1e88e5 0%, #00bcd4 100%)",
          p: 3,
        }}
      >
        <Paper
          elevation={4}
          sx={{
            maxWidth: 500,
            mx: "auto",
            mt: 4,
            p: 4,
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            borderRadius: 3,
          }}
        >
          {/* HEADING*/}
          <Typography
            variant="h3"
            sx={{
              mb: 4,
              textAlign: "center",
              fontWeight: 800,
              letterSpacing: "0.05em",
              background: "linear-gradient(45deg, #1e88e5 30%, #00bcd4 90%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              textShadow: "0 2px 4px rgba(0,0,0,0.1)",
              position: "relative",
              padding: "0.5em 0",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-2px) scale(1.02)",
                textShadow: "0 4px 8px rgba(0,0,0,0.2)",
                letterSpacing: "0.07em",
              },
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "60px",
                height: "3px",
                background: "linear-gradient(45deg, #1e88e5 30%, #00bcd4 90%)",
                borderRadius: "2px",
              },
            }}
          >
            Weather App
          </Typography>
          <WeatherForm onSearch={fetchWeather} />
          {error && (
            <Box sx={{ mt: 2, color: "error.main", textAlign: "center" }}>
              {error}
            </Box>
          )}
          {isLoading ? (
            <Box sx={{ mt: 2, textAlign: "center", color: "text.secondary" }}>
              Loading...
            </Box>
          ) : (
            <WeatherResult weather={weather} />
          )}
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default App;
