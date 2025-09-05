import { useState, type ChangeEvent } from 'react';
import AuthInput from '../components/AuthInput';
import Header from '../components/Header';
import AuthButton from '../components/AuthButton';

interface SignupUserInput {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  phoneNumber: string;
}

function Signup() {
  const [userInput, setUserInput] = useState<SignupUserInput>({
    email: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
    phoneNumber: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target);
    const { name, value } = e.target;
    console.log(name, value);
    setUserInput({ ...userInput, [name]: value });
  };

  return (
    <>
      <Header />
      <div className="flex justify-center items-center font-semibold text-2xl h-[70px]">
        회원가입
      </div>
      <form className="mt-7 mx-9">
        <AuthInput
          label="이메일"
          name="email"
          placeholder="example@gmail.com"
          value={userInput.email}
          onChange={handleChange}
          type="email"
        />
        <AuthInput
          label="비밀번호"
          name="password"
          placeholder="비밀번호를 입력하세요"
          value={userInput.password}
          onChange={handleChange}
          type="password"
        />
        <AuthInput
          label="비밀번호 확인"
          name="passwordConfirm"
          placeholder="비밀번호를 다시 입력하세요"
          value={userInput.passwordConfirm}
          onChange={handleChange}
          type="password"
        />
        <AuthInput
          label="닉네임"
          name="nickname"
          placeholder="ex) 홀덤고수"
          value={userInput.nickname}
          onChange={handleChange}
          type="text"
        />
        <AuthInput
          label="전화번호"
          name="phoneNumber"
          placeholder="ex) 010-1234-5678"
          value={userInput.phoneNumber}
          onChange={handleChange}
          type="tel"
        />
        <AuthButton content="회원가입" />
      </form>
    </>
  );
}

export default Signup;
