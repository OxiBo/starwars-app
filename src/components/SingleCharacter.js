import React from 'react';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import useFetchCharacters from '../hooks/fetchCharacters';

export default function SingleCharacter({ onClose, id }) {
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
        <div className="character__details-item">
          <h4>{name}</h4>
        </div>
        {ifExists(birth_year) && (
          <div className="character__details-item">
            <h5>Birth Year:</h5>
            <p>{birth_year}</p>
          </div>
        )}
        <div className="character__details-item">
          <h5>Home World:</h5>
          <p>{homeworld}</p>
        </div>
        {ifExists(gender) && (
          <div className="character__details-item">
            <h5>Gender:</h5>
            <p>{gender}</p>
          </div>
        )}
        {ifExists(eye_color) && (
          <div className="character__details-item">
            <h5>Eye color:</h5>
            <p>{eye_color}</p>
          </div>
        )}
        {ifExists(hair_color) && (
          <div className="character__details-item">
            <h5>Hair color:</h5>
            <p>{hair_color}</p>
          </div>
        )}
        {ifExists(skin_color) && (
          <div className="character__details-item">
            <h5>Skin color:</h5>
            <p>{skin_color}</p>
          </div>
        )}
        <div className="character__details-item">
          <h5>Films:</h5>
          <ul>
            {films.map(({ title, id }, idx) => (
              <li key={idx}>
                <Link to={`/films/${id}`}>{title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </>
    );
    return content;
  };
  return (
    <div className="character">
      <div className="character__details">{data && renderDetails(data)}</div>
      <button onClick={onClose}>close</button>
    </div>
  );
}
