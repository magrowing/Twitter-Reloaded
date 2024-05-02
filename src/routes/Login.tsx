import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';
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

export default function Login() {
  const [isLoading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (isLoading || form.email === '' || form.password === '') return;
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, form.email, form.password);
      navigate('/', { replace: true });
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
      <Title>Log into 𝕏</Title>
      <Form onSubmit={onSubmit}>
        <Input
          type="email"
          name="email"
          value={form.email}
          placeholder="Email"
          onChange={onChange}
          required
        />
        <Input
          type="password"
          name="password"
          value={form.password}
          placeholder="Password"
          onChange={onChange}
          required
        />
        <Button type="submit">{isLoading ? 'Loading...' : 'Login'}</Button>
      </Form>
      {error !== '' ? <Error>{error}</Error> : null}
      <Switcher>
        Don't have an account?{' '}
        <Link to="/create-account">Create one &rarr;</Link>
      </Switcher>
    </Wrapper>
  );
}
