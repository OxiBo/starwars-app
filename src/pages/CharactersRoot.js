import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SearchContext from '../context/SearchContext';
import SearchCharacter from './SearchCharacter';

export default function CharactersRoot() {
  const [name, setName] = useState('');
  return (
    <SearchContext.Provider value={name}>
      <SearchCharacter onSubmit={setName} />
      <Outlet />
    </SearchContext.Provider>
  );
}
