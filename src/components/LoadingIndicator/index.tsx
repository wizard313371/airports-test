import { Box, CircularProgress } from '@mui/material';

interface LoadingIndicatorProps {
  loading: boolean;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ loading }) => {
  return (
    loading ? (
      <Box display="flex" justifyContent="center" sx={{ mb: 4 }}>
        <CircularProgress />
      </Box>
    ) : null
  );
};

export default LoadingIndicator
