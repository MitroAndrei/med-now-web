import React, {useEffect, useState} from 'react';
import {TextField, InputAdornment, IconButton} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({onSearch}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [debounceTimeout, setDebounceTimeout] = useState(null);
    const handleSearch = (term) => {
        console.log(term)
        if (onSearch) {
            onSearch(term);
        }
    };

    const handleSearchPress = () => {
        handleSearch(searchTerm);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch(searchTerm);
        }
    };

    const handleChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        console.log(term)
        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }
        const timeout = setTimeout(() => {
            handleSearch(term);
        }, 200);
        setDebounceTimeout(timeout);
    };

    useEffect(() => {
        return () => {
            if (debounceTimeout) {
                clearTimeout(debounceTimeout);
            }
        };
    }, [debounceTimeout]);

    return (
        <TextField
            variant="outlined"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleChange}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={handleSearchPress}>
                            <SearchIcon/>
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            onKeyDown={handleKeyDown}
            fullWidth
        />
    );
};

export default SearchBar;
