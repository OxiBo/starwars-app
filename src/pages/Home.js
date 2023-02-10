import React from 'react';
import { Suspense } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';
import PageContent from '../components/PageContent';

import starwarsAPI from '../api/starwarsAPI';

export default function Home() {
  const { data } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={data}>
        {(loadedFilm) => {
          console.log(loadedFilm);
          const {
            title,
            director,
            planets,
            opening_crawl,
            characters,
            created,
          } = loadedFilm;
          return (
            <PageContent title={title}>
              description: {opening_crawl}
              director: {director}
              <p>
                year:{' '}
                {new Date(created).toDateString().split(' ').slice(1).join(' ')}
              </p>
            </PageContent>
          );
        }}
      </Await>
    </Suspense>
  );
}

async function loadRandomFilm() {
  // get random number in range 1 - 6 to get random film from starwars api (the api provides 6 films with ids - 1 to 6 )
  const id = Math.floor(Math.random() * (6 - 1) + 1);

  const res = await starwarsAPI.get(`/films/${id}`);
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

export function loader() {
  return defer({ data: loadRandomFilm() });
}
