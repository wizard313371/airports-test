import React, { useState, useCallback, useEffect } from 'react';
import { Container } from '@mui/material';
import { debounce } from 'lodash';
import useAirports from '../../hooks/useAirports';
import SearchInput from '../SearchInput/SearchInput';
import LoadingIndicator from '../LoadingIndicator';
import ResultList from '../ResultList';

const Search = () => {
  const [query, setQuery] = useState('');
  const [hasSearchedExternally, setHasSearchedExternally] = useState(false);
  const {
    loading,
    fetchAirportsByCountry,
    localSearch,
    searchResults,
    fetchAirport,
    resetSearch
  } = useAirports();

  useEffect(() => {
    fetchAirportsByCountry('US');
  }, []);

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      localSearch(query);
    }, 500),
    [localSearch]
  );

  const debouncedFetchAirport = useCallback(
    debounce((query: string, country: string) => {
      fetchAirport(query, country);
    }, 500),
    [fetchAirport]
  );

  const handleSearch = useCallback(
    (query: string) => {
      debouncedSearch(query);
    },
    [debouncedSearch]
  );

  useEffect(() => {
    if (searchResults?.length === 0 && query && !hasSearchedExternally) {
      debouncedFetchAirport(query, 'US');
      setHasSearchedExternally(true);
    }
  }, [searchResults, query, debouncedFetchAirport, hasSearchedExternally]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setHasSearchedExternally(false);
    if (event.target.value) {
      handleSearch(event.target.value.trim());
    } else {
      debouncedSearch.cancel();
      debouncedFetchAirport.cancel();
      resetSearch();
    }
  };

  return (
    <Container>
      <SearchInput query={query} onChange={handleChange} />
      <LoadingIndicator loading={loading} />
      <ResultList searchResults={searchResults} loading={loading} />
    </Container>
  );
};

export default Search;
