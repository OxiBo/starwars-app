import React, { Suspense } from 'react';
import { useParams, useRouteLoaderData, Await, Link } from 'react-router-dom';
import FilmContent from '../components/FilmContent';
import FilmsContent from '../components/FilmsContent';
import Loader from '../components/Loader';
import useFetch from '../hooks/fetchData';

export default function FilmPage() {
  const params = useParams();
  const { films } = useRouteLoaderData('films-loader');

  const { data, isLoading, error } = useFetch(`/films/${params.film}`);

  return (
    <>
      <FilmContent data={data} isLoading={isLoading} error={error} />
      <Suspense fallback={<Loader />}>
        <Await resolve={films}>
          {(loadedFilms) => {
            return <FilmsContent films={loadedFilms.results} />;
          }}
        </Await>
      </Suspense>
    </>
  );
}
