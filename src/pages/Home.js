import React from 'react';
import useFetch from '../hooks/fetchData';
import FilmContent from '../components/FilmContent';
import PageContent from '../components/PageContent';

// get random number in range 1 - 6 to get random film from starwars api (the api provides 6 films with ids - 1 to 6 )
const id = Math.floor(Math.random() * (6 - 1) + 1);

export default function Home() {
  const { data, isLoading, error } = useFetch(`/films/${id}`);

  return (
    <PageContent title={'Favorite Star Wars Movie for the day'}>
      <FilmContent data={data} isLoading={isLoading} error={error} />
    </PageContent>
  );
}
