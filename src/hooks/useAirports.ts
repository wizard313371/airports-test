import { useState, useCallback } from 'react';
import axios, { AxiosError } from 'axios';

export interface Airport {
  city: string;
  country: string;
  elevation_ft: string;
  iata: string;
  icao: string;
  latitude: string;
  longitude: string;
  name: string;
  region: string;
  timezone: string;
}

const api = axios.create({
  baseURL: 'https://airports-by-api-ninjas.p.rapidapi.com/v1/airports',
  headers: {
    'X-RapidAPI-Key': '4b3d50217bmsh5fd912f66f1e90fp112a84jsnd0835779ceda',
    'X-RapidAPI-Host': 'airports-by-api-ninjas.p.rapidapi.com'
  }
});

function useAirports() {
  const [data, setData] = useState<Airport[] | null>(null);
  const [searchResults, setSearchResults] = useState<Airport[] | null>(null);
  const [errorByCountry, setErrorByCountry] = useState<AxiosError | null>(null);
  const [errorByName, setErrorByName] = useState<AxiosError | null>(null);
  const [errorByIATA, setErrorByIATA] = useState<AxiosError | null>(null);
  const [errorFetchAirport, setErrorFetchAirport] = useState<AxiosError | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchAirportsByCountry = useCallback(async (country: string) => {
    try {
      const response = await api.get('', { params: { country } });
      setData(response.data);
      setSearchResults(response.data);
    } catch (err) {
      setErrorByCountry(err as AxiosError);
    }
  }, []);

  const fetchAirportByName = useCallback(async (name: string, country: string) => {
    try {
      const response = await api.get('', { params: { name, country } });
      return response.data;
    } catch (err) {
      setErrorByName(err as AxiosError);
    }
  }, []);

  const fetchAirportByIATA = useCallback(async (iata: string, country: string) => {
    try {
      const response = await api.get('', { params: { iata, country } });
      return response.data;
    } catch (err) {
      setErrorByIATA(err as AxiosError);
    }
  }, []);

  const fetchAirport = useCallback(async (query: string, country: string) => {
    setLoading(true);
    try {
      const requests = [fetchAirportByName(query, country)];
      if (query.length >= 3) {
        requests.push(fetchAirportByIATA(query, country));
      }
      const [byName, byIATA] = await Promise.all(requests);

      const combinedResults = Array.from(
        new Set([...(byName || []), ...(byIATA || [])])
      );
      setSearchResults(combinedResults);
    } catch (err) {
      setErrorFetchAirport(err as AxiosError);
    } finally {
      setLoading(false);
    }
  }, [fetchAirportByName, fetchAirportByIATA]);

  const localSearch = useCallback(
    (query: string) => {
      if (!data) return;
      if (!query) {
        setSearchResults(data);
        return;
      }
      setSearchResults(data.filter(
        (airport) =>
          airport.name.toLowerCase().includes(query.toLowerCase()) ||
          airport.iata.toLowerCase() === query.toLowerCase()
      ));
    },
    [data]
  );

  return {
    errorByCountry,
    errorByIATA,
    errorByName,
    errorFetchAirport,
    loading,
    fetchAirportsByCountry,
    fetchAirport,
    localSearch,
    searchResults
  };
}

export default useAirports;
