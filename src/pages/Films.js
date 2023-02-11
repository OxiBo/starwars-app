import { Suspense } from 'react';
import { json, useRouteLoaderData, Await, defer, Link } from 'react-router-dom';
import starwarsAPI from '../api/starwarsAPI';
import Loader from '../components/Loader';

export default function Films() {
  const { films } = useRouteLoaderData('films-loader');

  const renderFilms = (films) => {
    return films.map(({ title, director, release_date, url }, idx) => {
      const filmId = url.match(/\d/)[0];

      return (
        <li key={idx}>
          <Link to={`/films/${filmId}`}>
            <h3>{title}</h3>
          </Link>

          <p>director: {director}</p>
          <p>
            release date:{' '}
            {new Date(release_date)
              .toDateString()
              .split(' ')
              .slice(1)
              .join(' ')}
          </p>
        </li>
      );
    });
  };
  return (
    <Suspense fallback={<Loader />}>
      <Await resolve={films}>
        {(loadedFilms) => {
          return (
            <div>
              <ul>{renderFilms(loadedFilms.results)}</ul>
            </div>
          );
        }}
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
