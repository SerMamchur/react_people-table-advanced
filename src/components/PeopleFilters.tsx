import classNames from 'classnames';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex');

  function handelQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);

    params.set('query', event.target.value);
    setSearchParams(params);
  }

  function sexFiller(value: string) {
    const params = new URLSearchParams(searchParams);
    const sexi = ['f', 'm'];

    if (sexi.includes(value)) {
      params.set('sex', value);
    } else {
      params.delete('sex');
    }

    setSearchParams(params);
  }

  function toogCenturies(ch: string) {
    const params = new URLSearchParams(searchParams);

    const newCenturies = centuries.includes(ch)
      ? centuries.filter(century => century !== ch)
      : [...centuries, ch];

    params.delete('centuries');
    newCenturies.forEach(century => {
      params.append('centuries', century);
    });

    setSearchParams(params);
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
          const href = short ? `#/people/sex=${short}` : '#/people';

          return (
            <a
              key={option}
              className=""
              // href={href}
              onClick={() => sexFiller(short)}
            >
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
