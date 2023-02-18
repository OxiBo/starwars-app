import React, { useContext } from 'react';
import SearchContext from '../context/SearchContext';
import PageContent from '../components/PageContent';
import CharactersList from '../components/CharactersList';

export default function CharactersFound() {
  const name = useContext(SearchContext);
  return (
    <PageContent
      title={
        name
          ? `Star Wars Characters found for ${name}`
          : 'Search for Star Wars characters above'
      }
    >
      {name && <CharactersList url={`/people/?search=${name}&`} />}
    </PageContent>
  );
}
