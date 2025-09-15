import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import AuthInput from '../components/AuthInput';
import Header from '../components/Header';
import BigButton from '../components/BigButton';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

interface LoginUserInput {
  email: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const [userInput, setUserInput] = useState<LoginUserInput>({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (user) {
      navigate(`/user/${user.userId}`);
    }
  }, [user, navigate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userInput.email,
          password: userInput.password,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '로그인에 실패했습니다.');
      }
      const data = await response.json();

      if (data.access_token) {
        document.cookie = `access_token=Bearer ${data.access_token}; path=/; secure; samesite=strict`;
        login({
          userId: data.user.id,
          nickname: data.user.nickname
        });
      }

      alert('로그인에 성공했습니다.');
      console.log('Login successful:', data);
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      alert(error instanceof Error ? error.message : '로그인에 실패했습니다.');
    }
  };

  return (
    <>
      <Header />
      <form className="mx-9" noValidate onSubmit={handleSubmit}>
        <AuthInput
          label="이메일"
          name="email"
          placeholder="example@gmail.com"
          value={userInput.email}
          onChange={handleChange}
          type="email"
          isError={false}
        />
        <AuthInput
          label="비밀번호"
          name="password"
          placeholder="비밀번호를 입력해주세요."
          value={userInput.password}
          onChange={handleChange}
          type="password"
          isError={false}
        />
        <BigButton content="로그인" />
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
