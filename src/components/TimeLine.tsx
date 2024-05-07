/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';

import styled from 'styled-components';

import { Unsubscribe } from 'firebase/auth';
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
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

type TimeLineProps = {
  setEditId: (id: string) => void;
};

export default function TimeLine({ setEditId }: TimeLineProps) {
  const [tweets, setTweets] = useState<ITweet[]>([]);

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchTweets = async () => {
      // 컬렌션에서 tweets 데이터를 가져오는 쿼리
      const tweetsQuery = query(
        collection(db, 'tweets'),
        orderBy('createdAt', 'desc'), // createdAt 기준으로 최신순으로 가져오기
        limit(25) // 가져오는 쿼리의 갯수 제한
      );
      // 실시간으로 DB가 변경된 내용을 구독하고 있는 형태로 변경해서, 변경사항이 생기면 해당 데이터를 가져오도록 수정
      unsubscribe = await onSnapshot(tweetsQuery, (snapshot) => {
        const tweetsData = snapshot.docs.map((doc) => {
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
      });
    };
    fetchTweets();
    return () => {
      // 해당 컴포넌트가 언마운트 되었을때 구독취소 함수 실행시켜주는거 추가 작업
      unsubscribe && unsubscribe();
    };
  }, []);

  return (
    <Wrapper>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} data={tweet} setEditId={setEditId} />
      ))}
    </Wrapper>
  );
}
