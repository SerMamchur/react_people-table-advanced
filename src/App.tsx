import { Navigate, Route, Routes } from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';

import './App.scss';
import HomePage from './components/HomePage';
import PageNotFound from './components/PageNotFound';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="people/:slug?" element={<PeoplePage />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="home" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};




// const [searchParams, setSearchParams] = useSearchParams();
// const letters = searchParams.getAll('letters') || [];

// function toogLetters(ch) {
//   const params = new URLSearchParams(searchParams);
//   const newLetter = letters.includes(ch)
//     ? letters.filter(letter => letter !== ch)
//     : [...letters, ch];

//   params.delete('letters');
//   newLetter.forEach(letter => {
//     params.append('letters', letter);
//   });
//   setSearchParams(params);
// }
