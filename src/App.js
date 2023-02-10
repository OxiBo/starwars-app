import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/Root';
import ErrorPage from './pages/ErrorPage';
import Home, { loader as randomFilmLoader } from './pages/Home';
import Characters from './pages/Characters';
import Films from './pages/Films';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home />, loader: randomFilmLoader },
      { path: 'characters', element: <Characters /> },
      { path: 'films', element: <Films /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
