import { useState, useEffect, useCallback } from 'react';
import starwarsAPI from '../api/starwarsAPI';
import axios from 'axios';

const fetchDetails = async (url) => {
  try {
    const response = await axios.get(url).then((res) => res.data);
    return response;
  } catch (err) {
    console.error(err);
    return { error: err.message };
  }
};

const getDetailedInfo = async (list) => {
  const promises = list.map(async (item) => {
    const data = await fetchDetails(item);
    return data;
  });
  const fetchedDetails = await Promise.all(promises);
  return fetchedDetails;
};

const useFetchCharacters = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      try {
        let character = {};
        const { data } = await starwarsAPI.get(url);
        const {
          films,
          homeworld,
          birth_year,
          eye_color,
          gender,
          hair_color,
          name,
          skin_color,
        } = data;
        character = {
          birth_year,
          eye_color,
          gender,
          hair_color,
          name,
          skin_color,
        };
        if (films) {
          const films = await getDetailedInfo(data.films);
          const filmsParsed = films.map(({ title, url }) => {
            const id = url.match(/\d/)[0];
            return { title, id };
          });

          character.films = filmsParsed;
        }

        if (homeworld) {
          const homeworld = await getDetailedInfo([data.homeworld]);
          character.homeworld = homeworld[0].name || homeworld.error;
        }

        setData(character);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { isLoading, data, error };
};

export default useFetchCharacters;
