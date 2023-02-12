import React, { useState } from 'react';
import PageContent from '../components/PageContent';
import Pagination from '../components/Pagination';
import useFetch from '../hooks/fetchData';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import SingleCharacter from '../components/SingleCharacter';

const perPage = 10;

export default function Characters() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useFetch(`/people/?page=${page}`);

  const [selectedCharacter, setSelectedCharacter] = useState('');

  const onPageChange = (currentPage) => {
    setPage(currentPage);
  };

  const handleToggleSingleCharacter = (name) => {
    setSelectedCharacter(name);
  };

  const onCloseSingleCharacter = () => {
    setSelectedCharacter('');
  };
  //console.log(data);

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage error={error.message} />;

  return (
    <PageContent title={'All Star Wars Characters'}>
      <div className="characters">
        <ul className="characters__list">
          {data.results.map(({ name, birth_year, url }, idx) => {
            const characterId = url.match(/\d/)[0];

            return (
              <li key={idx} className="characters__list-item">
                <p onClick={() => handleToggleSingleCharacter(name)}> {name}</p>{' '}
                - born: {birth_year}
                {/* TODO - add an icon for expanding */}
                <div className="characters__list-item-details">
                  {selectedCharacter === name && (
                    <SingleCharacter
                      onClose={onCloseSingleCharacter}
                      id={characterId}
                    />
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        {data.count > perPage && (
          <div className="characters__list-pagination">
            <Pagination
              currentPage={page}
              perPage={perPage}
              total={data.count}
              onPageChange={onPageChange}
            />
          </div>
        )}
      </div>
    </PageContent>
  );
}
