import React, { Suspense } from 'react';
import { useParams, useRouteLoaderData, Await } from 'react-router-dom';
import FilmContent from '../components/FilmContent';
import FilmsContent from '../components/FilmsContent';
import Loader from '../components/Loader';
import PageContent from '../components/PageContent';
import useFetch from '../hooks/fetchData';

export default function FilmPage() {
  const params = useParams();
  const { films } = useRouteLoaderData('films-loader');

  const { data, isLoading, error } = useFetch(`/films/${params.film}`);

  return (
    <>
      <PageContent>
        <FilmContent
          data={data}
          isLoading={isLoading}
          error={error}
          scroll={true}
        />
      </PageContent>
      <Suspense fallback={<Loader />}>
        <Await resolve={films}>
          {(loadedFilms) => {
            return (
              <div className="bg-opaque">
                <FilmsContent films={loadedFilms.results} />;
              </div>
            );
          }}
        </Await>
      </Suspense>
    </>
  );
}
