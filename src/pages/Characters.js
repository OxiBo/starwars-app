import React from 'react';
import PageContent from '../components/PageContent';
import CharactersList from '../components/CharactersList';

export default function Characters() {
  return (
    <PageContent title={'All Star Wars Characters'}>
      <CharactersList url={'/people/?'} />
    </PageContent>
  );
}
