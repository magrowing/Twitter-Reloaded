import { Navigate } from 'react-router-dom';

import { auth } from '../firebase';

// 해당 컴포넌트는 로그인 되어 있는지 여부를 확인하고 그에 따라 페이지 이동 하는 역활
export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  // 유저가 로그인 확인 여부
  const user = auth.currentUser;

  // 유저가 로그인 되지 않은 경우, 로그인 페이지로 이동
  if (!user) {
    return <Navigate to="/login" />;
  }

  // 유저가 로그인 되어 있는 경우, 요청된 페이지로 이동
  return children;
}
