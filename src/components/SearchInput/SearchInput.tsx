import { TextField } from '@mui/material';

interface SearchInputProps {
  query: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ query, onChange }) => {
  return (
    <TextField
      label="Please enter airport name or code "
      variant="outlined"
      value={query}
      onChange={onChange}
      fullWidth
      autoComplete="off"
      sx={{ mb: 4 }}
    />
  );
};

export default SearchInput
