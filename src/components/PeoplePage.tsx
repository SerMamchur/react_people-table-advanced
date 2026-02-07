import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage(null);

    getPeople()
      .then(data => {
        setPeopleList(data);
      })
      .catch(() => {
        setErrorMessage('Something went wrong');
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      {peopleList.length >= 0 && (
        <>
          <div className="block">
            <div className="columns is-desktop is-flex-direction-row-reverse">
              <>
                {!isLoading && !errorMessage && peopleList.length > 0 && (
                  <div className="column is-7-tablet is-narrow-desktop">
                    <PeopleFilters />
                  </div>
                )}

                <div className="column">
                  <div className="box table-container">
                    {isLoading && <Loader />}
                    {errorMessage && (
                      <p data-cy="peopleLoadingError">{errorMessage}</p>
                    )}

                    {!isLoading && !errorMessage && peopleList.length === 0 && (
                      <p data-cy="noPeopleMessage">
                        There are no people on the server
                      </p>
                    )}

                    {/* <p>There are no people matching the current search criteria</p> */}

                    <PeopleTable peopleList={peopleList} />
                  </div>
                </div>
              </>
            </div>
          </div>
        </>
      )}
    </>
  );
};
