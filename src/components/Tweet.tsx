import { useState } from 'react';
import { styled } from 'styled-components';

import { auth, db, storage } from '../firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';

import Buttons from './Buttons';
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
  setEditId: (id: string) => void;
};

export default function Tweet({ data, setEditId }: TweetProps) {
  const currentUser = auth.currentUser;

  const { userName, photo, tweet, userId, id } = data;
  const [isShow, setShow] = useState(false);

  const onShow = () => {
    setShow(!isShow);
  };

  const onDelete = async () => {
    const ok = confirm('Are you sure you want to delete this tweet?');
    if (!ok || currentUser?.uid !== userId) return;
    try {
      await deleteDoc(doc(db, 'tweets', id));
      if (photo) {
        const photoRef = ref(storage, `tweets/${currentUser.uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onEdit = () => {
    setEditId(id);
    setShow(false);
  };

  return (
    <Wrapper>
      <ColumnImg>이미지</ColumnImg>
      <Column>
        <Username>{userName}</Username>
        <Payload>{tweet}</Payload>
        {photo && <Photo src={photo} alt="image" />}
      </Column>
      {userId === currentUser?.uid && (
        <Buttons
          isShow={isShow}
          onDelete={onDelete}
          onShow={onShow}
          onEdit={onEdit}
        />
      )}
    </Wrapper>
  );
}
