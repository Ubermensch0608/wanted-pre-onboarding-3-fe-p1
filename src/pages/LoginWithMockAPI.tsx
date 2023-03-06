import React, { useState } from 'react';

type LoginSuccessMessage = 'SUCCESS'
type LoginFailMessage = 'FAIL'

interface LoginResponse {
  message: LoginSuccessMessage | LoginFailMessage
  token: string
}

interface ClientUser {
  id:number,
  username: string,
  token: string,
}

// ---------- DB ----------

const USERS_DB = [
  {
    id: 1,
    username: '사과',
    password: 'qwerty123',
  },
  {
    id: 2,
    username: '몽구스',
    password: 'mongoose123',
  },
];

// ---------- Server Side ----------

const login = async (username: string, password: string): Promise<LoginResponse | null> => {
  // 1. 올바른 username, password를 입력하면 {message: 'SUCCESS', token: (원하는 문자열)} 를 반환

  // 2. Query문으로 DB에서 유저가 있는지 조회
  const foundUser = USERS_DB.find(
    (user) => user.username === username && user.password === password,
  );

  // 2-1. DB에 유저가 발견되지 않았을 때는 가입한 이력이 없다는 메시지 응답 혹은 회원가입 유도
  if (!foundUser) {
    return {
      message: 'FAIL',
      token: JSON.stringify('Bearer eyerersdkklcovjo22nldf'),
    };
  }

  // 2-2. DB에서 유저가 조회된 경우 성공 메시지와 토큰을 응답값으로 반환
  if (foundUser) {
    return {
      message: 'SUCCESS',
      // 2-3. 토큰은 클라이언트 요청에 맞추어 생성
      token: JSON.stringify('Bearer eyerersdkklcovjo22nldf'),
    };
  }

  return null;
};

const getUserInfo = async (token: string): Promise<ClientUser | null> => {
  const parsedToken = JSON.parse(token);

  if (parsedToken === 'Bearer eyerersdkklcovjo22nldf') {
    return {
      id: 1,
      username: '사과',
      token: 'Bearer eyerersdkklcovjo22nldf',
    };
  }

  // login 함수에서 받은 token을 이용해 사용자 정보를 받아오세요.

  return null;
};

// ---------- Client Side ----------

function LoginWithMockAPI() {
  // 1. input 및 form 데이터 관리
  // 유저 form에 대한 값을 받기 위해서 state, useRef, FormData를
  // 이용한 방법이 있다.
  // 어떤 것을 이용할 지는 상황에 따라 다름

  // 2. 유저 로그인 정보 상태관리
  const [user, setUser] = useState<ClientUser | null>(null);

  // 3. 유저 로그인 요청
  const loginSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 4. form 에서 username과 password를 받아 login 함수를 호출.
    const formData = new FormData(event.currentTarget);

    // 5. username로 조회되는 정보가 있는지 서버에 요청
    // 5-1. 있다면 해당 유저의 password가 일치하는 지 대조 및 토큰 값 받기
    // 5-2. 없다면 조회 실패 값 받기
    const loginResponse = await login(
      formData.get('username')?.toString() || '',
      formData.get('password')?.toString() || '',
    );
    if (!loginResponse) {
      alert('회원가입 이력이 없습니다!');
      return;
    }

    console.log(loginResponse.token);

    // 6. 서버로부터 받은 유저 토큰을 유저 인증 용도로 사용
    // 6-1. 서버가 가지고 있는 토큰과 일치한다면 유저임이 인증됨
    // 6-2. 일치하지 않는 경우는 클라이언트 토큰이 만료되었거나, 임의 조작 등
    const userInfo = await getUserInfo(loginResponse?.token);
    if (!userInfo) {
      alert('로그인 정보가 만료되었습니다!');
      return;
    }

    // 7. 로그인 되었다면 성공 메시지
    alert('로그인되었습니다.');
    setUser(userInfo);
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
        {JSON.stringify({ ...user })}
      </div>
    </div>
  );
}

export default LoginWithMockAPI;
