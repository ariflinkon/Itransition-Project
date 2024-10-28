import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <Box component="form" onSubmit={handleSearch} sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search templates..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '20px', // Rounded corners
            height: '40px', // Lower height
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton type="submit" edge="end">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default SearchBar;