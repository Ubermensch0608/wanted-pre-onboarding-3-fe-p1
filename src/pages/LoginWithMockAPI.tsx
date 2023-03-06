import React, { useState } from 'react';

type LoginSuccessMessage = 'SUCCESS'
type LoginFailMessage = 'FAIL'

interface UserInfo {
  name: string;
}

interface User {
  username: string;
  password: string;
  userInfo: UserInfo;
}

interface LoginResponse {
  message: LoginSuccessMessage | LoginFailMessage
  token: string
}

const login = async (username: string, password: string): Promise<LoginResponse | null> => {
  // TODO: 올바른 username, password를 입력하면 {message: 'SUCCESS', token: (원하는 문자열)} 를 반환하세요.

  if (username && password) {
    return {
      message: 'SUCCESS',
      token: JSON.stringify('Bearer eyerersdkklcovjo22nldf'),
    };
  }

  return null;
};

const getUserInfo = async (token: string): Promise<{ username: string } | null> => {
  const parsedToken = JSON.parse(token);

  if (parsedToken === 'Bearer eyerersdkklcovjo22nldf') {
    return {
      username: '종원',
    };
  }

  // OK TODO: login 함수에서 받은 token을 이용해 사용자 정보를 받아오세요.

  return null;
};

// -----

function LoginWithMockAPI() {
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  const [user, setUser] = useState<string | undefined>();

  const loginSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // OK TODO: form 에서 username과 password를 받아 login 함수를 호출하세요.
    const formData = new FormData(event.currentTarget);

    const loginResponse = await login(
      formData.get('username')?.toString() || '',
      formData.get('password')?.toString() || '',
    );
    if (!loginResponse) return;

    const userInfo = await getUserInfo(loginResponse.token);
    if (!userInfo) return;

    console.log(userInfo);

    setUser(userInfo.username);
  };

  return (
    <div>
      <h1>
        Login with Mock API
      </h1>
      <form onSubmit={loginSubmitHandler}>
        <label htmlFor="username">
          Username:
          <input
            id="username"
            type="text"
            name="username"
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            id="password"
            type="password"
            name="password"
          />
        </label>
        <input type="submit" value="Submit" />
        {/* TODO: 여기에 username과 password를 입력하는 input을 추가하세요. 제출을 위해 button도 추가하세요. */}
      </form>
      <div>
        <h2>
          User info
        </h2>
        {/* TODO: 유저 정보를 보여주도록 구현하세요. 필요에 따라 state나 다른 변수를 추가하세요. */}
        {JSON.stringify({ username: user })}
      </div>
    </div>
  );
}

export default LoginWithMockAPI;
