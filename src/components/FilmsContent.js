import React from 'react';
import { Link } from 'react-router-dom';

export default function FilmsContent({ films }) {
  const renderFilms = (films) => {
    return films.map(({ title, director, release_date, url }, idx) => {
      const filmId = url.match(/\d/)[0];

      return (
        <li
          key={idx}
          className="films__list-item u-center-text u-margin-top-small u-margin-bottom-small"
        >
          <Link to={`/films/${filmId}`} className="films__list-item-link">
            <h3>{title}</h3>
          </Link>
          <div className="film-content">
            <p className="film-subtitle">Director:</p>{' '}
            <p className="film-description">{director}</p>
          </div>
          <div className="film-content">
            <p className="film-subtitle">Release date: </p>
            <p className="film-description">
              {new Date(release_date)
                .toDateString()
                .split(' ')
                .slice(1)
                .join(' ')}
            </p>
          </div>
          <hr className="style-one u-margin-top-small" />
        </li>
      );
    });
  };
  return (
    <div className="films u-margin-top-medium u-margin-bottom-big">
      <ul className="films__list">{renderFilms(films)}</ul>
    </div>
  );
}
