import React, { useState } from 'react';

import styled from 'styled-components';

import { auth, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;

const AvatarUpload = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #1d9bf0;
  overflow: hidden;
  cursor: pointer;
  svg {
    width: 50px;
  }
`;

const AvatarInput = styled.input`
  display: none;
`;

const AvatarImg = styled.img`
  width: 100%;
`;

const Name = styled.p`
  font-size: 22px;
`;

export default function Profile() {
  const user = auth.currentUser;
  const [avatar, setAvatar] = useState(user?.photoURL);

  const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!user) return;

    if (files && files.length === 1) {
      const file = files[0];

      if (file.size > 1024 * 1024 * 1) {
        alert('최대 1MB까지 업로드 가능합니다.');
        e.target.value = ''; // 동일한 파일할 경우도 있으므로
        return;
      }

      const locationRef = ref(storage, `avatar/${user.uid}`);
      const result = await uploadBytes(locationRef, file);
      const avatarUrl = await getDownloadURL(result.ref);
      setAvatar(avatarUrl);
      await updateProfile(user, {
        photoURL: avatarUrl,
      });
    }
  };

  return (
    <Wrapper>
      <AvatarUpload htmlFor="avatar">
        {avatar ? (
          <AvatarImg src={avatar} alt="user 이미지" />
        ) : (
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
          </svg>
        )}
      </AvatarUpload>
      <AvatarInput
        type="file"
        id="avatar"
        accept="image/*"
        onChange={onAvatarChange}
      />
      <Name>{user?.displayName ?? 'Anonymous'}</Name>
    </Wrapper>
  );
}
