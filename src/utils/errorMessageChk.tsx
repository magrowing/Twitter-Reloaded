export const errorMessageChk = (code: string) => {
  switch (code) {
    case 'auth/invalid-email': {
      return '잘못된 이메일 형식입니다.';
    }
    case 'auth/email-already-in-use': {
      return '이미 사용 중인 이메일입니다.';
    }
    case 'auth/weak-password': {
      return '비밀번호는 6글자 이상이어야 합니다.';
    }
    case 'auth/user-not-found': {
      return '이메일 일치하지 않습니다.';
    }
    case 'auth/wrong-password': {
      return '비밀번호가 일치하지 않습니다.';
    }
    default:
      return `${code} : 실패하였습니다.`;
  }
};
