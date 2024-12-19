import React from "react";
import { Box, Paper, Typography, Grid } from "@mui/material";
import {
  WiThermometer,
  WiHumidity,
  WiStrongWind,
  WiBarometer,
} from "react-icons/wi";

const WeatherResult = ({ weather }) => {
  if (!weather) return null;

  return (
    <Paper
      elevation={3}
      sx={{
        mt: 3,
        p: 3,
        background: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(10px)",
        borderRadius: 3,
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
        },
      }}
    >
      <Typography
        variant="h5"
        sx={{
          mb: 2,
          textAlign: "center",
          background: "linear-gradient(135deg, #1e88e5 0%, #00bcd4 100%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
          fontWeight: "bold",
        }}
      >
        {weather.name}, {weather.sys.country}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <WiThermometer size={40} color="#1e88e5" />
            <Box>
              <Typography variant="body2" color="text.secondary">
                Temperature
              </Typography>
              <Typography variant="h6">
                {Math.round(weather.main.temp)}°C
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <WiHumidity size={40} color="#00bcd4" />
            <Box>
              <Typography variant="body2" color="text.secondary">
                Humidity
              </Typography>
              <Typography variant="h6">{weather.main.humidity}%</Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <WiStrongWind size={40} color="#1e88e5" />
            <Box>
              <Typography variant="body2" color="text.secondary">
                Wind Speed
              </Typography>
              <Typography variant="h6">{weather.wind.speed} m/s</Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <WiBarometer size={40} color="#00bcd4" />
            <Box>
              <Typography variant="body2" color="text.secondary">
                Pressure
              </Typography>
              <Typography variant="h6">{weather.main.pressure} hPa</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default WeatherResult;
