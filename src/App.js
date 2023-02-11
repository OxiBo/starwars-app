import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/Root';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import CharactersRoot from './pages/CharactersRoot';
import Characters, { loader as charactersLoader } from './pages/Characters';
import Character from './pages/Character';
import FilmsRoot from './pages/FilmsRoot';
import Films, { loader as filmsLoader } from './pages/Films';
import FilmPage from './pages/Film';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'characters',
        element: <CharactersRoot />,
        //loader: charactersLoader,
        children: [
          { index: true, element: <Characters /> },
          { path: ':name', element: <Character /> },
        ],
      },
      {
        path: 'films',
        element: <FilmsRoot />,
        id: 'films-loader',
        loader: filmsLoader,
        children: [
          { index: true, element: <Films /> },
          { path: ':film', element: <FilmPage /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
