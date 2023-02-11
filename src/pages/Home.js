import React from 'react';
import useFetch from '../hooks/fetchData';
import FilmContent from '../components/FilmContent';

// get random number in range 1 - 6 to get random film from starwars api (the api provides 6 films with ids - 1 to 6 )
const id = Math.floor(Math.random() * (6 - 1) + 1);

export default function Home() {
  const { data, isLoading, error } = useFetch(`/films/${id}`);

  return <FilmContent data={data} isLoading={isLoading} error={error} />;
}
