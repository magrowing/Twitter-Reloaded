import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { styled } from 'styled-components';

import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

import { errorMessageChk } from '../utils/errorMessageChk';

const Wrapper = styled.section`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  padding: 50px 0;
`;

const Title = styled.h1`
  font-size: 42px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin: 50px 0 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const Error = styled.p`
  font-weight: 600;
  color: tomato;
`;

const Switcher = styled.p`
  margin-top: 20px;
  a {
    color: #1d9bf0;
  }
`;

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
