import { useState, useEffect } from 'react';

import styled from 'styled-components';

import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';

import Tweet from './Tweet';

const Wrapper = styled.div``;

export interface ITweet {
  id: string;
  photo?: string;
  tweet: string;
  userId: string;
  userName: string;
  createdAt: number;
}

export default function TimeLine() {
  const [tweets, setTweets] = useState<ITweet[]>([]);

  const fetchTweets = async () => {
    // 컬렌션에서 tweets 데이터를 가져오는 쿼리
    const tweetsQuery = query(
      collection(db, 'tweets'),
      orderBy('createdAt', 'desc') // createdAt 기준으로 최신순으로 가져오기
    );
    // getDocs 함수에 위에 정의한 쿼리를 적용해서 모든 문서들을 가져온다.
    const spanshot = await getDocs(tweetsQuery);
    const tweetsData = spanshot.docs.map((doc) => {
      // 가져온 모든 문서들에서 데이터를 추출하고, 문서의 아이디까지 포함된 새로운 객체 생성한 후 새로운 배열로 반환
      const { tweet, createdAt, userId, userName, photo } = doc.data();
      return {
        tweet,
        createdAt,
        userId,
        userName,
        photo,
        id: doc.id,
      };
    });
    setTweets(tweetsData);
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  return (
    <Wrapper>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} data={tweet} />
      ))}
    </Wrapper>
  );
}
