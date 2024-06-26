import { useState } from 'react';

import { auth, db, storage } from '../firebase';
import { collection, addDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 20px;
  border: 1px solid #fff;
  border-radius: 10px;
  resize: none;
  background-color: #000;
  color: #fff;
  font-size: 16px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

  &::placeholder {
    font-size: 16px;
  }

  &:focus {
    outline: none;
    border-color: #1d9bf0;
  }
`;

const AttachFileButton = styled.label`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  color: #1d9bf0;
  border-radius: 50px;
  border: 1px solid #1d9bf0;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  svg {
    width: 30px;
    margin-right: 10px;
  }
`;

const PreviewImg = styled.img`
  width: 100%;
`;

const AttachInput = styled.input`
  display: none;
`;

const SubmitBtn = styled.button`
  background-color: #1d9bf0;
  color: white;
  border: none;
  padding: 20px 0px;
  border-radius: 50px;
  font-size: 16px;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.9;
  }
`;

const MAX_IMAGE_SIZE_BYTES = 1024 * 1024 * 1;

export default function PostTweetForm() {
  const [isLoading, setLoading] = useState(false);
  const [tweet, setTweet] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [imgPath, setImgPath] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && files.length === 1) {
      if (files[0].size > MAX_IMAGE_SIZE_BYTES) {
        alert('최대 1MB까지 업로드 가능합니다.');
        e.target.value = ''; // 동일한 파일할 경우도 있으므로
        return;
      }

      // 이미지 미리보기 기능 추가 방식 1
      // const reader = new FileReader();
      // reader.readAsDataURL(files[0]);
      // reader.onload = () => {
      //   setImgPath(reader.result as string);
      // };

      // 이미지 미리보기 기능 추가 방식 2
      setImgPath(URL.createObjectURL(files[0]));
      setFile(files[0]);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser; // firebase를 통해 유저정보가져오기

    if (!user || isLoading || tweet === '' || tweet.length > 180) return;

    try {
      setLoading(true);
      const doc = await addDoc(collection(db, 'tweets'), {
        tweet,
        createdAt: Date.now(),
        userName: user.displayName || 'Anonymous',
        userId: user.uid,
      });
      if (file) {
        const locationRef = ref(storage, `tweets/${user.uid}/${doc.id}`); // url : tweets 폴더생성 / 유저고유의 아이디 /트윗문서ID 설정

        const result = await uploadBytes(locationRef, file);
        const url = await getDownloadURL(result.ref); // 퍼블릭 URL 받음
        await updateDoc(doc, {
          photo: url,
        });
      }
      // 모든 필트 초기화 작업
      setTweet('');
      setFile(null);
      setImgPath('');
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <TextArea
        rows={5}
        maxLength={180}
        placeholder="What is Happening?"
        value={tweet}
        onChange={onChange}
        required
      />
      {imgPath && <PreviewImg src={imgPath} />}
      <AttachFileButton htmlFor="file">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
            clipRule="evenodd"
          />
        </svg>
        {''} {file ? 'Photo added ✅' : 'Add photo'}
      </AttachFileButton>
      <AttachInput
        type="file"
        id="file"
        accept="image/*"
        onChange={onFileChange}
      />
      <SubmitBtn type="submit">
        {isLoading ? 'Posting....' : 'Post Tweet'}
      </SubmitBtn>
    </Form>
  );
}
