import useSWR from 'swr';
import starwarsAPI from '../api/starwarsAPI';

const useFetch = (url) => {
  const fetcher = (url) => starwarsAPI.get(url).then((res) => res.data);

  const { data, error } = useSWR(url, fetcher);

  const isLoading = !data && !error;
  return { isLoading, data, error };
};

export default useFetch;
