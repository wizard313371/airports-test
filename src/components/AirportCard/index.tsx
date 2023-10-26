import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { Airport } from '../../hooks/useAirports';

interface AirportCardProps {
  airport: Airport;
}

const AirportCard: React.FC<AirportCardProps> = ({ airport }) => {
  return (
    <Card sx={{ minWidth: 275, mb: 2 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography component="div">
              {airport.name} {airport.iata ? `(${airport.iata})` : ''}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2">
              lat: {airport.latitude}
            </Typography>
            <Typography variant="body2">
              lng: {airport.longitude}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default React.memo(AirportCard);
