import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
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

export default function CreateAccount() {
  const [isLoading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
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
    if (
      isLoading ||
      form.name === '' ||
      form.email === '' ||
      form.password === ''
    )
      return;
    try {
      setLoading(true);
      // 1.create an account : 새로운 계정 생성
      const credentials = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      //console.log(credentials);
      // 2.set the name of the user : 생성된 유저 프로필 지정
      await updateProfile(credentials.user, { displayName: form.name });
      // 3.redirect to the home page : 홈으로 리다이렉션
      navigate('/', { replace: true });
    } catch (e) {
      // 이메일이 존재하거나, 비밀번호가 맞지 않는 경우
      if (e instanceof FirebaseError) {
        //console.log(e.code, e.message);
        setError(errorMessageChk(e.code));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>Join 𝕏</Title>
      <Form onSubmit={onSubmit}>
        <Input
          type="text"
          name="name"
          value={form.name}
          placeholder="Name"
          onChange={onChange}
          required
        />
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
        <Button type="submit">
          {isLoading ? 'Loading...' : 'Create account'}
        </Button>
      </Form>
      {error !== '' ? <Error>{error}</Error> : null}
      <Switcher>
        Already have an account? <Link to="/login">Log in &rarr;</Link>
      </Switcher>
    </Wrapper>
  );
}
