import React, { useState } from 'react';
import Pagination from '../components/Pagination';
import useFetch from '../hooks/fetchData';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

const perPage = 10;

export default function Characters() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useFetch(`/people/?page=${page}`);

  const onPageChange = (currentPage) => {
    setPage(currentPage);
  };

  //console.log(data);
  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage error={error.message} />;

  return (
    <>
      <ul>
        {data.results.map(({ name }, idx) => (
          <li key={idx}>{name}</li>
        ))}
      </ul>

      <div>
        {data.count > perPage && (
          <div className="cocktails__list-pagination">
            <Pagination
              currentPage={page}
              perPage={perPage}
              total={data.count}
              onPageChange={onPageChange}
            />
          </div>
        )}
      </div>
    </>
  );
}

export async function loader() {
  // // get random number in range 1 - 6 to get random film from starwars api (the api provides 6 films with ids - 1 to 6 )
  // const id = Math.floor(Math.random() * (6 - 1) + 1);
  // const res = await starwarsAPI.get(`/films/${id}`);
  // // TODO - test when no internet connection
  // if (res.status !== 200) {
  //   throw json(
  //     { message: 'Could not fetch Star War films.' },
  //     {
  //       status: 500,
  //     }
  //   );
  // } else {
  //   return res.data;
  // }
}
