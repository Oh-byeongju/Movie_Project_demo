/*
 23-01-19 로그인 구현(오병주)
*/
import React, {useState} from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { USER_LOGIN_REQUEST } from '../../reducer/R_user_login';
import { useLocation, Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
	// useDispatch를 dispatch로 선언
  const dispatch = useDispatch();

	// 페이지 이동을 위해 선언
	const location = useLocation();
	const navigate = useNavigate();	

	//input창 두개 관리를 위해 만든것
	const [inputs, setInputs] = useState({
    id: "",
    pw: "",
  }); 

	// 비구조화 할당을 통해 값 추출
  const { id, pw } = inputs; 

  const onChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  };

  // 로그인 버튼 누를 때 적용되는 함수
  const submit = ()=> {
    const datas = {
      uid: id,
      upw: pw
    };

    dispatch({
      type: USER_LOGIN_REQUEST,
			data: datas
    });

		// 만약에 로그인 페이지 url을 바로 입력해서 들어왔을경우 메인 페이지로, 아닌경우 이전 페이지로 이동
		// 근데 추후 회원가입 페이지나 이런곳에서 왔으면 메인으로 보내게 만들어야할듯
		if (location.state === null) {
			navigate(`/`);
		}
		else {
			navigate(`${location.state.url}`);
		}
  };

  // id, pw 입력에 따른 로그인 버튼 활성화 함수
  const [isActive, setActive] = useState(true);

  // id, pw 입력마다 실행되는 함수 (id, pw 둘다 빈칸이 아닌경우 로그인 버튼이 활성화됨)
  const ActiveIsPassedLogin = () => {
    return id !== "" && pw !== "" ? setActive(false) : setActive(true);
  };

	return (
		<div>
			<Layout>
				<Title>
					회원 로그인
				</Title>
				<Form>
					<CheckText>
					</CheckText>
					<LoginId name="id"
					type="text"
					placeholder="아이디"
					onChange={onChange}
					value={id}
					onKeyUp={ActiveIsPassedLogin}
					>
					</LoginId>
          <LoginPw
					name="pw"
					type="password"
					placeholder="비밀번호"
					onChange={onChange}
					value={pw}
					onKeyUp={ActiveIsPassedLogin}
					>
					</LoginPw>
					<LoginMid>
						<label className="autoLogin" htmlFor="hint">
							{" "}
							<input type="checkbox" id="hint" /> 로그인 유지하기
						</label>
          </LoginMid>
					<LoginButton onClick={submit} disabled={isActive}>
            로그인
          </LoginButton>
					<Links>
						<Link to="/UserJoin">회원가입</Link>
						<Link to="/">아이디 찾기</Link>
						<Link to="/">비밀번호 찾기</Link>
					</Links>
				</Form>
			</Layout>
		</div>
	);
};

const Layout = styled.div`
	min-width: 1050px;
	margin-top: 50px;
	margin-bottom: 7px;
	background-color: #fff;
`;

const Title = styled.div`
	margin-bottom: 30px;
	font-size: 28px;
	line-height: 35px;
	font-weight: 550;
	text-align: center;
	letter-spacing: -1px;
	color: rgb(51, 51, 51);
`;

const Form = styled.div`
	width: 640px;
  margin: 0px auto;
`;

const CheckText = styled.div`
	position: inline-block;
	padding-bottom: 10px;
	border-bottom: 2px solid rgb(51, 51, 51);
	font-size: 13px;
	color: rgb(102, 102, 102);
	line-height: 17px;
	width: 70%;
	margin: auto;
  display: block;
`;

const LoginId = styled.input`
  margin-top: 40px !important;
  border-radius: 2px;
  width: 60%;
  height: 50px;
  border: 1px solid #e5e5e5;
  padding: 9px 12px;
  outline: none;
  box-sizing: border-box;
	margin: auto;
  display: block;
	font-size: 14px;
`;

const LoginPw = styled.input`
  margin-top: 20px !important;
  border-radius: 2px;
  width: 100%;
  height: 50px;
  border: 1px solid #e5e5e5;
  padding: 9px 12px;
  outline: none;
  box-sizing: border-box;
	margin: auto;
	display: block;
	width: 60%;
	font-size: 14px;
`;

const LoginMid = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4px;
	margin-left: 128px;

  .autoLogin {
    font-size: 14px;
    color: #8d8d8d;
    line-height: 3;
    cursor: pointer;
  }

  .btn {
    font-size: 14px;
    color: #8d8d8d;
    line-height: 3;
    cursor: pointer;
    border: none;
    background-color: white;
  }
`;

const LoginButton = styled.button`
  position: relative;
  line-height: 19px;
  text-align: center;
  background-color: #503396;
  font-weight: 700;
  cursor: pointer;
  line-height: 48px;
  padding: 0 20px;
  margin-top: 15px !important;
  width: 60%;
  font-size: 16px;
  border-radius: 3px;
  display: inline-block;
  text-decoration: none;
  color: #fff;
  border: 0;
  height: 50px;
	margin: auto;
  display: block;

  &:disabled {
    background-color: #dddfe4 !important;
    cursor: default !important;
  }
`;

const Links = styled.div`
  padding: 20px 0 30px 0;
  text-align: center;
  line-height: 1.1;
	margin-top: 5px;
	margin-bottom: 53px;
	margin-left: 5px;

  a:first-child {
    margin-left: 0;
    padding-left: 0;
  }

  a:first-child:before {
    display: none;
  }

  a {
    display: inline-block;
    position: relative;
    vertical-align: middle;
    margin: 0 0 0 27px;
    padding: 0;
    font-size: 0.9333em;
    color: #666;
    text-decoration: none;
  }

  a:before {
    content: "";
    display: block;
    position: absolute;
    left: -15px;
    top: 50%;
    width: 2px;
    height: 16px;
    margin-top: -8px;
    background-color: #d8d9db;
    pointer-events: none;
  }
`;

export default LoginForm;