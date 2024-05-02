import { styled } from 'styled-components';

export const Wrapper = styled.section`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  padding: 50px 0;
`;

export const Title = styled.h1`
  font-size: 42px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin: 50px 0 10px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  font-size: 16px;
`;

export const Button = styled.button`
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

export const Error = styled.p`
  font-weight: 600;
  color: tomato;
`;

export const Switcher = styled.p`
  margin-top: 20px;
  a {
    color: #1d9bf0;
  }
`;
