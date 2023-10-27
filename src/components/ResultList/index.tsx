import { Airport } from '../../hooks/useAirports';
import AirportCard from '../AirportCard';
import { Typography } from '@mui/material';

interface ResultListProps {
  searchResults: Airport[] | null;
  loading: boolean
}

const ResultList: React.FC<ResultListProps> = ({ searchResults, loading }) => {
  return (
    <>
      {searchResults?.map(airport => (
        <AirportCard airport={airport} key={airport.latitude + airport.longitude} />
      ))}
      {searchResults?.length === 0 && !loading && (
        <Typography component="div">airports not found</Typography>
      )}
    </>
  );
};

export default ResultList
