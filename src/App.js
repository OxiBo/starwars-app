import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/Root';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import CharactersRoot from './pages/CharactersRoot';
import Characters from './pages/Characters';
import Character from './pages/Character';
import FilmsRoot from './pages/FilmsRoot';
import Films, { loader as filmsLoader } from './pages/Films';
import FilmPage from './pages/Film';
import CharactersFound from './pages/CharactersFound';
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
        children: [
          { index: true, element: <Characters /> },
          { path: ':id', element: <Character /> },
          {
            path: 'found',
            element: <CharactersFound />,
          },
        ],
      },
      {
        path: 'films',
        element: <FilmsRoot />,
        id: 'films-loader',
        loader: filmsLoader,
        children: [
          { index: true, element: <Films /> },
          {
            path: ':film',
            element: <FilmPage />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
