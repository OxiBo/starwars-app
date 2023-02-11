import React from 'react';
import { Link } from 'react-router-dom';

export default function FilmsContent({ films }) {
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
    <div>
      <ul>{renderFilms(films)}</ul>
    </div>
  );
}
