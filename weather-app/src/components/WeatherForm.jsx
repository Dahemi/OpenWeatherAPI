// First, install these dependencies:
// npm install @mui/material @mui/icons-material @emotion/react @emotion/styled

import React, { useState } from "react";
import { 
  Paper,
  TextField,
  Button,
  Box,
  CircularProgress,
  Typography
} from "@mui/material";
import {
  Search as SearchIcon,
  LocationOn as LocationIcon
} from "@mui/icons-material";

const WeatherForm = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (city.trim()) {
      setIsLoading(true);
      try {
        await onSearch(city);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Paper 
      elevation={3}
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 4,
        p: 3,
        background: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(10px)"
      }}
    >
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            InputProps={{
              startAdornment: (
                <LocationIcon sx={{ mr: 1, color: "text.secondary" }} />
              ),
            }}
            disabled={isLoading}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={isLoading || !city.trim()}
            sx={{
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              color: 'white',
              boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
              height: 48,
              '&:hover': {
                background: 'linear-gradient(45deg, #1976D2 30%, #00BCD4 90%)',
              }
            }}
          >
            {isLoading ? (
              <>
                <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
                Searching...
              </>
            ) : (
              <>
                <SearchIcon sx={{ mr: 1 }} />
                Search Weather
              </>
            )}
          </Button>

          {city.trim() && (
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                gap: 0.5,
                mt: 1 
              }}
            >
              <LocationIcon fontSize="small" />
              Searching for weather in {city}
            </Typography>
          )}
        </Box>
      </form>
    </Paper>
  );
};

export default WeatherForm;