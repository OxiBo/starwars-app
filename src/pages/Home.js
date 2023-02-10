import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import starwarsAPI from '../api/starwarsAPI';
import { Suspense } from 'react';
import {
  useLoaderData,
  json,
  defer,
  Await,
  useNavigation,
} from 'react-router-dom';
import useFetch from '../hooks/fetchData';
import PageContent from '../components/PageContent';

import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

// get random number in range 1 - 6 to get random film from starwars api (the api provides 6 films with ids - 1 to 6 )
const id = Math.floor(Math.random() * (6 - 1) + 1);

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

export default function Home() {
  const { data, isLoading, error } = useFetch(`/films/${id}`);
  const [people, setPeople] = useState([]);
  const [peopleError, setPeopleError] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [peopleLoaded, setPeopleLoaded] = useState(false);

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

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage error={error.message} />;

  const { title, director, planets, opening_crawl, characters, created } = data;

  const renderPeople = (people, count) => {
    const peopleList = people.slice(0, count).map(({ name }, idx) => (
      <li key={idx}>
        <p>name: {name}</p>
      </li>
    ));
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
    <PageContent title={title}>
      description: {opening_crawl}
      director: {director}
      people:{' '}
      {peopleError ? (
        'Failed to fetch characters info'
      ) : (
        <div>
          <ul>
            {renderPeople(
              people,
              showMore ? people.length : initialPeopleCount
            )}
          </ul>

          <button className="show-more" onClick={handleShowMoreClick}>
            {showMore ? 'Show less' : 'Show more'}
          </button>
        </div>
      )}
      <p>
        year: {new Date(created).toDateString().split(' ').slice(1).join(' ')}
      </p>
    </PageContent>
  );
}
