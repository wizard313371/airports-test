import React, { useState, useCallback, useEffect } from 'react';
import { Box, CircularProgress, Container, TextField, Typography } from '@mui/material';
import { debounce } from 'lodash';
import useAirports from '../../hooks/useAirports';
import AirportCard from '../AirportCard';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [hasSearchedExternally, setHasSearchedExternally] = useState(false);
  const {
    loading,
    fetchAirportsByCountry,
    localSearch,
    searchResults,
    fetchAirport
  } = useAirports();

  useEffect(() => {
    fetchAirportsByCountry('US');
  }, []);

  const handleSearch = useCallback(
    debounce((query: string) => {
      localSearch(query);
    }, 500),
    [localSearch, query]
  );

  useEffect(() => {
    if (searchResults?.length === 0 && query && !hasSearchedExternally) {
      fetchAirport(query, 'US');
      setHasSearchedExternally(true);
    }
  }, [searchResults, query, fetchAirport]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setHasSearchedExternally(false);
    handleSearch(event.target.value);
  };

  return (
    <Container>
      <TextField
        label="Please enter airport name or code "
        variant="outlined"
        value={query}
        onChange={handleChange}
        fullWidth
        autoComplete="off"
        sx={{ mb: 4 }}
      />
      {loading && (
        <Box display="flex" justifyContent="center" sx={{ mb: 4 }}>
          <CircularProgress />
        </Box>
      )}
      {searchResults?.map(airport => <AirportCard airport={airport} key={airport.latitude + airport.longitude} />)}
      {searchResults?.length === 0 && query.length > 0 && !loading && <Typography component="div">
        airports not found
      </Typography>}
    </Container>
  );
};

export default SearchBar;
