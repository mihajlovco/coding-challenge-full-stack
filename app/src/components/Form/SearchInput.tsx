import React, { useCallback, useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Input from "@mui/material/Input";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import debounce from "lodash.debounce";

interface SearchInputProps {
  onChange: (value: string) => void;
}

export const SearchInput = ({ onChange }: SearchInputProps) => {
  const [searchValue, setSearchValue] = useState("");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const debouncedChangeHandler = debounce(() => {
    onChange(searchValue);
  }, 300);

  useEffect(() => {
    debouncedChangeHandler();
    return () => {
      debouncedChangeHandler.cancel();
    };
  }, [searchValue]);

  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search image gallery"
        onChange={(e) => handleOnChange(e)}
        inputProps={{ "aria-label": "Search image gallery" }}
        value={searchValue}
      />
      <IconButton
        onClick={(e) => {
          e.preventDefault();
          onChange(searchValue);
        }}
        type="button"
        sx={{ p: "10px" }}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

SearchInput;
