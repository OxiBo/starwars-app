import React from 'react';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import useFetchCharacters from '../hooks/fetchCharacters';

export default function SingleCharacter({ id, expanded = false }) {
  const { data, isLoading, error } = useFetchCharacters(`/people/${id}`);

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage error={error.message} />;

  const renderDetails = (data) => {
    const {
      birth_year,
      eye_color,
      gender,
      hair_color,
      name,
      skin_color,
      homeworld,
      films,
    } = data;

    const ifExists = (description) =>
      description !== 'unknown' && description !== 'n/a';

    const content = (
      <>
        {!expanded && (
          <div className="character__details-name  u-margin-top-small">
            <h1 className="u-center-text">{name}</h1>
            <hr className="style-two u-margin-bottom-small" />
          </div>
        )}
        {ifExists(birth_year) && (
          <div className="character__details-item">
            <h5 className="character__details-item-subtitle">Birth Year:</h5>
            <p className="character__details-item-description">{birth_year}</p>
          </div>
        )}
        <div className="character__details-item">
          <h5 className="character__details-item-subtitle">Home World:</h5>
          <p className="character__details-item-description">{homeworld}</p>
        </div>
        {ifExists(gender) && (
          <div className="character__details-item">
            <h5 className="character__details-item-subtitle">Gender:</h5>
            <p className="character__details-item-description">{gender}</p>
          </div>
        )}
        {ifExists(eye_color) && (
          <div className="character__details-item">
            <h5 className="character__details-item-subtitle">Eye color:</h5>
            <p className="character__details-item-description">{eye_color}</p>
          </div>
        )}
        {ifExists(hair_color) && (
          <div className="character__details-item">
            <h5 className="character__details-item-subtitle">Hair color:</h5>
            <p className="character__details-item-description">{hair_color}</p>
          </div>
        )}
        {ifExists(skin_color) && (
          <div className="character__details-item">
            <h5 className="character__details-item-subtitle">Skin color:</h5>
            <p className="character__details-item-description">{skin_color}</p>
          </div>
        )}
        <div className="character__details-item">
          <h5 className="character__details-item-subtitle">Films:</h5>
          <div className="character__details-item-description">
            <ul className="character__details-item-description-list">
              {films.map(({ title, id }, idx) => {
                console.log(films.length, idx);
                return (
                  <li
                    key={idx}
                    className="character__details-item-description-list-item"
                  >
                    <Link
                      to={`/films/${id}`}
                      className="character__details-item-description-list-item-link"
                    >
                      {title}
                      {films.length > idx + 1 && ','}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </>
    );
    return content;
  };
  return (
    <div className="character">
      <div className="character__details u-margin-bottom-small">
        {data && renderDetails(data)}
      </div>
    </div>
  );
}
