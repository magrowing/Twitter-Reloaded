import { auth } from '../firebase';

export default function Home() {
  const handleLogout = () => {
    auth.signOut();
  };
  return (
    <>
      <h1>Home</h1>
      <button type="button" onClick={handleLogout}>
        Logout!
      </button>
    </>
  );
}
