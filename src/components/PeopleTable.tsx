import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  visiblePeoples: Person[];
};

export const PeopleTable: React.FC<Props> = ({ visiblePeoples }) => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const handleSort = (key: keyof Person) => {
    const newParams = new URLSearchParams(searchParams);

    if (sort !== key) {
      newParams.set('sort', key);
    } else if (order !== 'desc') {
      newParams.set('order', 'desc');
    } else {
      newParams.delete('order');
      newParams.delete('sort');
    }

    setSearchParams(newParams);
  };

  return (
    <>
      {visiblePeoples.length > 0 && (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Name
                  <a onClick={() => handleSort('name')}>
                    <span className="icon">
                      <i className="fas fa-sort" />
                    </span>
                  </a>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Sex
                  <a onClick={() => handleSort('sex')}>
                    <span className="icon">
                      <i className="fas fa-sort" />
                    </span>
                  </a>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Born
                  <a onClick={() => handleSort('born')}>
                    <span className="icon">
                      <i className="fas fa-sort-up" />
                    </span>
                  </a>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Died
                  <a onClick={() => handleSort('died')}>
                    <span className="icon">
                      <i className="fas fa-sort" />
                    </span>
                  </a>
                </span>
              </th>

              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {visiblePeoples.map(person => {
              const mother = visiblePeoples.find(
                p => p.name === person.motherName,
              );
              const father = visiblePeoples.find(
                p => p.name === person.fatherName,
              );

              return (
                <tr
                  data-cy="person"
                  className={
                    person.slug === slug ? 'has-background-warning' : ''
                  }
                  key={person.slug}
                >
                  <td>
                    <PersonLink person={person} nameFallBack={person.name} />
                  </td>

                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>

                  <td>
                    <PersonLink
                      person={mother}
                      nameFallBack={person.motherName}
                    />
                  </td>

                  <td>
                    <PersonLink
                      person={father}
                      nameFallBack={person.fatherName}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
