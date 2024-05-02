import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { FirebaseError } from 'firebase/app';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';

import { errorMessageChk } from '../utils/errorMessageChk';

import {
  Wrapper,
  Title,
  Form,
  Input,
  Button,
  Error,
  Switcher,
} from '../styles/authStyle';

export default function FindPassword() {
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (isLoading || email === '') return;
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      // TODO : alert을 통해 이메일을 통해 확인 필요 메세지 띄울것
      navigate('/login', { replace: true });
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(errorMessageChk(e.code));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>Find Password</Title>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name="email"
          value={email}
          placeholder="Email"
          type="email"
          required
        />
        <Button type="submit">{isLoading ? 'Loading...' : 'Send Email'}</Button>
      </Form>
      {error !== '' ? <Error>{error}</Error> : null}
      <Switcher>
        Already have an account? <Link to="/login">Log in &rarr;</Link>
      </Switcher>
    </Wrapper>
  );
}
