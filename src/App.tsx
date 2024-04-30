import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { routes } from './routes';
import { GlobalStyles } from './styles/GlobalStyles';

const router = createBrowserRouter(routes);

export default function App() {
  return (
    <>
      <GlobalStyles />
      <RouterProvider router={router} />
    </>
  );
}
