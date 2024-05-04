import { styled } from 'styled-components';

import { ITweet } from './TimeLine';

const Wrapper = styled.div`
  display: flex;
  padding: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
`;

const ColumnImg = styled.div`
  width: 50px;
  height: 50px;
`;

const Column = styled.div`
  flex: 1;
  padding-left: 10px;
`;

const Photo = styled.img`
  width: 100%;
  border-radius: 16px;
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
`;

const Payload = styled.p`
  margin: 10px 0px;
  font-size: 18px;
`;

type TweetProps = {
  data: ITweet;
};

export default function Tweet({ data }: TweetProps) {
  const { userName, photo, tweet } = data;
  return (
    <Wrapper>
      <ColumnImg>이미지</ColumnImg>
      <Column>
        <Username>{userName}</Username>
        <Payload>{tweet}</Payload>
        {photo && <Photo src={photo} alt="image" />}
      </Column>
    </Wrapper>
  );
}
