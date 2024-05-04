import { styled } from 'styled-components';

import PostTweetForm from '../components/PostTweetForm';
import TimeLine from '../components/TimeLine';

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr 5fr;
  gap: 50px;
`;

export default function Home() {
  return (
    <Wrapper>
      <PostTweetForm />
      <TimeLine />
    </Wrapper>
  );
}
