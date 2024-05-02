import { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { routes } from './routes';
import { GlobalStyles } from './styles/GlobalStyles';

import { auth } from './firebase';

import LoadingScreen from './components/LoadingScreen';
import styled from 'styled-components';

const router = createBrowserRouter(routes);

const Wrapper = styled.article`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

export default function App() {
  // firebase에서 유저 로그인과 정보를 확인하는 동안 Loading처리를 위한 상태
  const [isLoading, setLoading] = useState(true);

  const init = async () => {
    // await for firebase
    // firebase가 로그인 여부나 유저를 확인하는 과정의 로직
    // 최초 인증 상태가 완료 될 때 실행
    // firebase 제공하는 메소드  : authStateReady()
    // firebase가 쿠키와 토큰을 읽고 백엔드와 소통해 로그인 여우블 확인하는 동안 기다림
    await auth.authStateReady();
    setLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Wrapper>
      <GlobalStyles />
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
    </Wrapper>
  );
}
