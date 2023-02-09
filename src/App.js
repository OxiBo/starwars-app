import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/Root';
import Home from './pages/Home';
import Characters from './pages/Characters';
import Films from './pages/Films';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: 'characters', element: <Characters /> },
      { path: 'films', element: <Films /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
