import React from 'react';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import useFetchCharacters from '../hooks/fetchCharacters';

export default function SingleCharacter({ id, expanded = false }) {
  const { data, isLoading, error } = useFetchCharacters(`/people/${id}`);

  if (isLoading) return <Loader />;
  if (error)
    return (
      <ErrorMessage
        error={error.message}
        titleStyle={'error-header-small'}
        textStyle={'error-text-small'}
      />
    );

  const renderDetails = (data) => {
    const {
      name,
      films,
      homeworld,
      mass,
      birth_year,
      eye_color,
      gender,
      hair_color,
      skin_color,
      species,
      vehicles,
      starships,
      created,
    } = data;
    const renderList = (data, item) => (
      <div className="character__details-item">
        <h5 className="character__details-item-subtitle">{item}:</h5>
        <div className="character__details-item-description">
          <ul className="character__details-item-description-list">
            {data.map(({ name, model }, idx) => {
              return (
                <li
                  key={idx}
                  className="character__details-item-description-list-item"
                >
                  <p className="character__details-item-description-list-item-link">
                    {name}(model: {model}){data.length > idx + 1 && ','}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );

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
        <div className="character__details-item">
          <h5 className="character__details-item-subtitle">Created:</h5>
          <p className="character__details-item-description">
            {new Date(created).toDateString().split(' ').slice(1).join(' ')}
          </p>
        </div>
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

        {species && (
          <div className="character__details-item">
            <h5 className="character__details-item-subtitle">Species:</h5>
            <div className="character__details-item-description">
              <ul className="character__details-item-description-list">
                {species.map(({ classification, name, language }, idx) => {
                  return (
                    <li
                      key={idx}
                      className="character__details-item-description-list-item"
                    >
                      <p className="character__details-item-description-list-item-link">
                        {name} (classification: {classification}
                        {ifExists(language) && `, language(${language})`}
                        {species.length > idx + 1 && ','})
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}

        {ifExists(gender) && (
          <div className="character__details-item">
            <h5 className="character__details-item-subtitle">Gender:</h5>
            <p className="character__details-item-description">{gender}</p>
          </div>
        )}
        <div className="character__details-item">
          <h5 className="character__details-item-subtitle">Mass:</h5>
          <p className="character__details-item-description">{mass} kg</p>
        </div>
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

        {starships && renderList(starships, 'Starships')}

        {vehicles && renderList(vehicles, 'Vehicles')}

        <div className="character__details-item">
          <h5 className="character__details-item-subtitle">Films:</h5>
          <div className="character__details-item-description">
            <ul className="character__details-item-description-list">
              {films.map(({ title, id }, idx) => {
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
