import React from "react";

const SearchBar = ({ onSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search by name..."
      onChange={(e) => onSearch(e.target.value)}
      style={{ margin: "20px", padding: "5px" }}
    />
  );
};

export default SearchBar;
