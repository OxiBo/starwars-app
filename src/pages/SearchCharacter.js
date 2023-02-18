import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function SearchCharacter({ onSubmit }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (query) {
      onSubmit(query);
      if (location.pathname.match(/(^\/)?characters(\/)?$/)) {
        navigate('/characters/found');
      }
    }
    setQuery('');
  };

  const handleChange = (event) => {
    const enteredQuery = event.target.value.trim();
    setQuery(enteredQuery);
  };

  return (
    <div className="search-characters u-margin-top-small">
      <form
        method=""
        action=""
        onSubmit={handleSubmit}
        className="search-characters__form"
      >
        <label htmlFor="name">Search Characters</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter name..."
          aria-label="Search for character"
          value={query}
          onChange={handleChange}
          className="search-characters__form-input"
          autoComplete="off"
        />
        <button type="submit" className="search-characters__form-button btn">
          Search
        </button>
      </form>
    </div>
  );
}
