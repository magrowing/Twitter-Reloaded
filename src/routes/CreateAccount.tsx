import React, { useState } from 'react';

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
  margin-bottom: 50px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
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

export default function CreateAccount() {
  const [isLoading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

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
    try {
      // create an account
      // set the name of the user
      // redirect to the home page
    } catch (e) {
      //setError
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>Login to 𝕏</Title>
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
