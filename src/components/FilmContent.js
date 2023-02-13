import React, { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

const fetchPeople = async (url) => {
  try {
    const response = await axios.get(url).then((res) => res.data);
    return response;
  } catch (err) {
    console.error(err);
    return { error: err.message };
  }
};
const initialPeopleCount = 3;

export default function FilmContent({
  data,
  isLoading,
  error,
  scroll = false,
}) {
  const [people, setPeople] = useState([]);
  const [peopleError, setPeopleError] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [peopleLoaded, setPeopleLoaded] = useState(false);
  // get the element to scroll into view if displayed
  const mainContent = useRef();

  const getPeopleInfo = useCallback(async (list) => {
    const promises = list.map(async (person) => {
      const data = await fetchPeople(person);
      if (data.error) {
        setPeopleError(data.error);
        return null;
      } else {
        setPeopleError(null);
        return data;
      }
    });
    const fetchedPeople = await Promise.all(promises);

    setPeople((prev) => prev.concat(fetchedPeople));
  }, []);

  // fetch details about first n characters to display on page load; return error if api failed to return at least one of the characters
  useEffect(() => {
    if (data) {
      getPeopleInfo(data.characters.slice(0, initialPeopleCount));
    }
  }, [data, getPeopleInfo]);

  useEffect(() => {
    if (mainContent.current && scroll) {
      mainContent.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [mainContent, data, scroll]);

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage error={error.message} />;

  const { title, director, planets, opening_crawl, characters, created } = data;

  const renderPeople = (people, count) => {
    const peopleList = people.slice(0, count).map(({ name, url }, idx) => {
      const characterId = url.match(/\d/)[0];
      return (
        <li key={idx} className="list-content-items-item">
          <Link
            to={`/characters/${characterId}`}
            className="list-content-items-item-link"
          >
            {name}
            {people.length > idx + 1 && ','}
          </Link>
        </li>
      );
    });
    return peopleList;
  };

  const handleShowMoreClick = async () => {
    setShowMore((prev) => !prev);
    if (data && !peopleLoaded) {
      getPeopleInfo(data.characters.slice(initialPeopleCount));
    }
    setPeopleLoaded(true);
  };
  return (
    <div ref={mainContent} className="film  u-margin-bottom-medium">
      <h2 className="film__header u-center-text u-margin-top-medium u-margin-bottom-medium">
        {title}
      </h2>
      <div>
        <div className="content u-margin-top-small">
          <p className="subtitle">Synopsis:</p>
          <p className="description">{opening_crawl}</p>
        </div>
        <div className="content u-margin-top-small">
          <p className="subtitle"> Director: </p>
          <p className="description"> {director}</p>
        </div>

        <div className="content u-margin-top-small">
          <p className="subtitle"> People:</p>
          {peopleError ? (
            <p className="text-error">Failed to fetch characters info</p>
          ) : (
            <div className="description list-content">
              <ul className="list-content-items">
                {renderPeople(
                  people,
                  showMore ? people.length : initialPeopleCount
                )}
              </ul>
              {people.length && (
                <button
                  className="show-more u-margin-top-small u-margin-bottom-small"
                  onClick={handleShowMoreClick}
                >
                  {showMore ? 'Show less' : 'Show more...'}
                </button>
              )}
            </div>
          )}
        </div>

        <div className="content">
          <p className="subtitle">Year: </p>
          <p className="description">
            {new Date(created).toDateString().split(' ').slice(1).join(' ')}
          </p>
        </div>
      </div>
    </div>
  );
}
