import classNames from 'classnames';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

// type Record = 'string' | 'string'[] | null | number;

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries') || [];

  function setSearchWith(param: any) {
    const result = getSearchWith(searchParams, param);

    setSearchParams(result);
  }

  function handelQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const val = event.target.value.trimStart().trim();
    const result = val === '' ? { query: null } : { query: val };

    setSearchWith(result);
  }

  function sexFiller(value: string) {
    const result = ['f', 'm'].includes(value) ? { sex: value } : { sex: null };

    setSearchWith(result);
  }

  function toogCenturies(ch: string) {
    const newCenturies = centuries.includes(ch)
      ? centuries.filter(century => century !== ch)
      : [...centuries, ch];

    setSearchWith({ centuries: newCenturies });
  }

  // function deleteCenturies() {
  //   const params = new URLSearchParams(searchParams);

  //   params.delete('centuries');
  //   setSearchParams(params);
  // }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {['All', 'Male', 'Female'].map(option => {
          const short = option === 'All' ? '' : option[0].toLowerCase();
          // const href = short ? `#/people/sex=${short}` : '#/people';

          return (
            <a key={option} className="" onClick={() => sexFiller(short)}>
              {option}
            </a>
          );
        })}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            onChange={handelQueryChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {['16', '17', '18', '19', '20'].map(number => {
              return (
                <a
                  key={number}
                  data-cy="century"
                  className={classNames('button mr-1', {
                    'is-info': centuries.includes(number.toString()),
                  })}
                  href={`#/people?centuries=${number}`}
                  onClick={e => {
                    e.preventDefault();
                    toogCenturies(number);
                    // deleteCenturies();
                  }}
                >
                  {number}
                </a>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              href="#/people"
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a className="button is-link is-outlined is-fullwidth" href="#/people">
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
