import { useEffect, useState, type ChangeEvent } from 'react';
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

  const [inputErrors, setInputErros] = useState<SignupUserInput>({
    email: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
    phoneNumber: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };

  useEffect(() => {
    const newError = {
      email: '',
      password: '',
      passwordConfirm: '',
      nickname: '',
      phoneNumber: '',
    };

    // email validate
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (userInput.email === '') {
      newError.email = '';
    } else if (!emailRegex.test(userInput.email)) {
      newError.email = '올바른 이메일을 입력해주세요.';
    } else {
      newError.email = '';
    }

    // password validate
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/;
    if (userInput.password === '') {
      newError.password = '';
    } else if (!passwordRegex.test(userInput.password)) {
      newError.password = '비밀번호는 영문 숫자를 포함해 8~20자입니다.';
    } else {
      newError.password = '';
    }

    // passwordConfirm validate
    if (userInput.passwordConfirm === '') {
      newError.passwordConfirm = '';
    } else if (userInput.passwordConfirm !== userInput.password) {
      newError.passwordConfirm = '동일한 비밀번호를 다시 한 번 입력해주세요.';
    } else {
      newError.passwordConfirm = '';
    }

    // nickname validate
    const nicknameRegex = /^[a-zA-Z0-9가-힣]{3,10}$/;
    if (userInput.nickname === '') {
      newError.nickname = '';
    } else if (!nicknameRegex.test(userInput.nickname)) {
      newError.nickname = '닉네임은 3 ~ 10자입니다.';
    } else {
      newError.nickname = '';
    }

    // phoneNumber validate
    const phoneNumberRegex = /^010[0-9]{8}$/;
    if (userInput.phoneNumber === '') {
      newError.phoneNumber = '';
    } else if (!phoneNumberRegex.test(userInput.phoneNumber)) {
      newError.phoneNumber = '전화번호는 (-) 없이 숫자만 11자로 입력해주세요';
    } else {
      newError.phoneNumber = '';
    }

    setInputErros(newError);
  }, [userInput]);

  return (
    <>
      <Header />
      <div className="flex justify-center items-center font-semibold text-2xl h-[70px]">
        회원가입
      </div>
      <form className="mt-7 mx-9" noValidate>
        <AuthInput
          label="이메일"
          name="email"
          placeholder="example@gmail.com"
          value={userInput.email}
          onChange={handleChange}
          type="email"
          isError={inputErrors.email !== ''}
          errorMsg={inputErrors.email}
        />
        <AuthInput
          label="비밀번호"
          name="password"
          placeholder="비밀번호를 입력하세요"
          value={userInput.password}
          onChange={handleChange}
          type="password"
          isError={inputErrors.password !== ''}
          errorMsg={inputErrors.password}
        />
        <AuthInput
          label="비밀번호 확인"
          name="passwordConfirm"
          placeholder="비밀번호를 다시 입력하세요"
          value={userInput.passwordConfirm}
          onChange={handleChange}
          type="password"
          isError={inputErrors.passwordConfirm !== ''}
          errorMsg={inputErrors.passwordConfirm}
        />
        <AuthInput
          label="닉네임"
          name="nickname"
          placeholder="ex) 홀덤고수"
          value={userInput.nickname}
          onChange={handleChange}
          type="text"
          isError={inputErrors.nickname !== ''}
          errorMsg={inputErrors.nickname}
        />
        <AuthInput
          label="전화번호"
          name="phoneNumber"
          placeholder="ex) 010-1234-5678"
          value={userInput.phoneNumber}
          onChange={handleChange}
          type="tel"
          isError={inputErrors.phoneNumber !== ''}
          errorMsg={inputErrors.phoneNumber}
        />
        <AuthButton content="회원가입" />
      </form>
    </>
  );
}

export default Signup;
