import React, { useEffect, useState } from "react";

const SearchFilter = ({ handleSearch }) => {
  const [search, setSearch] = useState("");
  useEffect(() => {
    handleSearch(search);
  }, [search, handleSearch]);
  return (
    <input
      type="text"
      placeholder="Search email field here"
      className="w-25 form-control"
      onChange={(e) => {
        setSearch(e.target.value);
      }}
    />
  );
};

export default SearchFilter;
