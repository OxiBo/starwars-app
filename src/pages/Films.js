import { Suspense } from 'react';
import { json, useRouteLoaderData, Await, defer, Link } from 'react-router-dom';
import starwarsAPI from '../api/starwarsAPI';
import Loader from '../components/Loader';
import PageContent from '../components/PageContent';
import FilmsContent from '../components/FilmsContent';

export default function Films() {
  const { films } = useRouteLoaderData('films-loader');

  return (
    <Suspense fallback={<Loader />}>
      <Await resolve={films}>
        {(loadedFilms) => (
          <PageContent title={'Star Wars Movies'}>
            <FilmsContent films={loadedFilms.results} />
          </PageContent>
        )}
      </Await>
    </Suspense>
  );
}

async function loadFilms() {
  const res = await starwarsAPI.get(`/films`);
  // TODO - test when no internet connection
  if (res.status !== 200) {
    throw json(
      { message: 'Could not fetch Star War films.' },
      {
        status: 500,
      }
    );
  } else {
    return res.data;
  }
}
export async function loader() {
  return defer({ films: loadFilms() });
}
