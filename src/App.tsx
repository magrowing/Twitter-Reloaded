import { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { routes } from './routes';
import { GlobalStyles } from './styles/GlobalStyles';

import LoadingScreen from './components/LoadingScreen';

const router = createBrowserRouter(routes);

export default function App() {
  // firebase에서 유저 로그인과 정보를 확인하는 동안 Loading처리를 위한 상태
  const [isLoading, setLoading] = useState(true);

  const init = async () => {
    // await for firebase
    setLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <GlobalStyles />
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
    </>
  );
}
