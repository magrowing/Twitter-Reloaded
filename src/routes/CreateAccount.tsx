import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';

import styled from 'styled-components';

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

const errorMsgChk = (code: string) => {
  switch (code) {
    case 'auth/invalid-email': {
      return '잘못된 이메일 형식입니다.';
    }
    case 'auth/email-already-in-use': {
      return '이미 사용 중인 이메일입니다.';
    }
    case 'auth/weak-password': {
      return '비밀번호는 6글자 이상이어야 합니다.';
    }
    default:
      return `${code} : 회원가입에 실패 하였습니다.`;
  }
};

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
        setError(errorMsgChk(e.code));
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
    </Wrapper>
  );
}
