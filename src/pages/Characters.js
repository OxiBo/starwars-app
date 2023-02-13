// TODO - add search functionality to find a character - https://swapi.dev/api/people/?name={someName}

import React, { useState } from 'react';
import PageContent from '../components/PageContent';
import Pagination from '../components/Pagination';
import useFetch from '../hooks/fetchData';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import SingleCharacter from '../components/SingleCharacter';
import { getIdFromUrl } from '../utils/smallFuncs';

const perPage = 10; // the number of characters returned by star wars api /people/?page=

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

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage error={error.message} />;

  return (
    <PageContent title={'All Star Wars Characters'}>
      <div className="characters u-margin-top-medium u-margin-bottom-medium">
        <ul className="characters__list">
          {data.results.map(({ name, url }, idx) => {
            const characterId = getIdFromUrl(url);
            return (
              <li key={idx} className="characters__list-item">
                <div className="characters__list-item-description u-margin-bottom-small">
                  <p
                    onClick={() => handleToggleSingleCharacter(name)}
                    className="characters__list-item-description-name"
                  >
                    {name}
                  </p>
                </div>

                <div className="characters__list-item-details u-margin-top">
                  {selectedCharacter === name && (
                    <>
                      <SingleCharacter id={characterId} expanded={true} />
                      <div className="characters__list-item-details-btn u-margin-top-tiny u-margin-bottom-tiny">
                        <button
                          onClick={onCloseSingleCharacter}
                          className="btn cancel"
                        >
                          cancel
                        </button>
                      </div>
                    </>
                  )}
                </div>
                <hr className="style-one u-margin-bottom-small" />
              </li>
            );
          })}
        </ul>
      </div>

      <>
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
      </>
    </PageContent>
  );
}
