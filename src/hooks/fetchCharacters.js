import { useState, useEffect } from 'react';
import starwarsAPI from '../api/starwarsAPI';
import axios from 'axios';
import { getIdFromUrl } from '../utils/smallFuncs';

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
  const fetchedDetails = await Promise.all(promises); // TODO - filter and return error if any has error
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
        character = {
          birth_year,
          eye_color,
          gender,
          mass,
          hair_color,
          name,
          skin_color,
          created,
        };
        if (films.length) {
          const films = await getDetailedInfo(data.films);
          const filmsParsed = films.map(({ title, url }) => {
            const id = getIdFromUrl(url);
            return { title, id };
          });

          character.films = filmsParsed;
        }

        if (homeworld) {
          const homeworldDetails = await getDetailedInfo([homeworld]);
          character.homeworld =
            homeworldDetails[0].name || homeworldDetails.error;
        }

        if (species.length) {
          const speciesDetails = await getDetailedInfo(species);
          const speciesParsed = speciesDetails.map(
            ({ classification, name, language }) => {
              return { classification, name, language };
            }
          );

          character.species = speciesParsed;
        }

        if (vehicles.length) {
          const vehiclesDetails = await getDetailedInfo(vehicles);
          const vehiclesParsed = vehiclesDetails.map(({ name, model }) => {
            return { name, model };
          });
          character.vehicles = vehiclesParsed;
        }

        if (starships.length) {
          const starshipsDetails = await getDetailedInfo(starships);
          const startshipsParsed = starshipsDetails.map(({ name, model }) => {
            return { name, model };
          });
          character.starships = startshipsParsed;
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
