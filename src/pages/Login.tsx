import { useState, type ChangeEvent } from 'react';
import AuthInput from '../components/AuthInput';
import Header from '../components/Header';
import AuthButton from '../components/AuthButton';
import { Link } from 'react-router';

interface LoginUserInput {
  email: string;
  password: string;
}

function Login() {
  const [userInput, setUserInput] = useState<LoginUserInput>({
    email: '',
    password: '',
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
      <form className="mx-9">
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
          placeholder="비밀번호를 입력해주세요."
          value={userInput.password}
          onChange={handleChange}
          type="password"
        />
        <AuthButton content="로그인" />
      </form>
      <Link to="/signup">
        <div className="mx-9 border border-primary-green h-12 rounded-sm mt-2 text-primary-green flex items-center justify-center text-xl">
          회원가입
        </div>
      </Link>
    </>
  );
}

export default Login;
