import { useState } from 'react';

import { styled } from 'styled-components';

import PostTweetForm from '../components/PostTweetForm';
import TimeLine from '../components/TimeLine';

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr 5fr;
  gap: 50px;
`;

export default function Home() {
  const [editId, setEditId] = useState('');

  const resetEditId = () => {
    setEditId('');
  };

  return (
    <Wrapper>
      <PostTweetForm editId={editId} resetEditId={resetEditId} />
      <TimeLine setEditId={setEditId} />
    </Wrapper>
  );
}
