import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './routes/Home';
import Profile from './routes/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
