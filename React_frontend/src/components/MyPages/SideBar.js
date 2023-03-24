/*
 23-03-10 마이페이지 css 구축(오병주)
*/
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { RightOutlined } from "@ant-design/icons";
import { useLocation } from 'react-router-dom';

// 마이페이지 왼쪽 사이드바
const SideBar = () => {
	const location = useLocation();

	const [state, setState] = useState({
    Reserve: false,
    Cancel: false,
		Finish: false,
		Like: false,
		Comment: false,
		Modify: false
  });

	const { Reserve, Cancel, Finish, Like, Comment, Modify } = state;

	// 이걸로 처음 렌더링때만 true 해주고 나머지는 버튼 누를 때 마다 바꿔줘야할듯
	// 내일은 예매 취소하는거 메소드 만들고 어찌저찌하면 마이페이지 끝
	// 내 정보 조회를 만들지 말지 고민
	// 이거 생각좀 해봐야할듯
	useEffect(()=> {
		console.log(location.pathname.substring(8))

		setState({
      ...state, 
      [location.pathname.substring(8)]: true
    });

		console.log(state);
	}, [])

	return (
		<SideBarLayout>
			<SideTitle>
				마이페이지
			</SideTitle>
			<SideUL>
				<li>
					<Link to="/Mypage/Reserve">
						예매내역
						<span>
							<RightOutlined/>
						</span>
					</Link>
				</li>
				<li>
					<Link to="/Mypage/Cancel">
						예매 취소내역
						<span>
							<RightOutlined/>
						</span>
					</Link>
				</li>
				<li>
					<Link to="/Mypage/Finish">
						지난 관람내역
						<span>
							<RightOutlined/>
						</span>
					</Link>
				</li>
				<li>
					<Link to="/Mypage/Like">
						찜한 영화
						<span>
							<RightOutlined/>
						</span>
					</Link>
				</li>
				<li>
					<Link to="/Mypage/Comment">
						관람평 내역
						<span>
							<RightOutlined/>
						</span>
					</Link>
				</li>
				<li>
					<Link to="/Mypage/Modify">
						회원정보 수정
						<span>
							<RightOutlined/>
						</span>
					</Link>
				</li>
			</SideUL>
		</SideBarLayout>
	);
};

const SideBarLayout = styled.div`
	width: 170px;
	box-sizing: border-box;
	margin: 0;
	padding: 0;
`;

const SideTitle = styled.div`
	padding: 9px 0px 30px 1px;
	font-weight: 500;
	font-size: 28px;
	line-height: 35px;
	color: rgb(51, 51, 51);
	letter-spacing: -1px;
	font-weight: 550;
`;

const SideUL = styled.ul`
	margin: 0;
	padding: 0;
	list-style-type: none;
	border: 1px solid rgb(221, 223, 225);

	li {
		width: 100%;
		box-sizing: border-box;
    margin: 0;
		padding: 0;
		display: list-item;

		a {
			cursor: pointer;
			text-decoration: none;
			padding: 14px 20px 16px;
			display: flex;
			-webkit-box-pack: justify;
			justify-content: space-between;
			-webkit-box-align: center;
			align-items: center;
			line-height: 19px;
			letter-spacing: -0.3px;
			font-size: 14px;
			color: rgb(102, 102, 102);
			box-sizing: border-box;
			border-bottom: 1px solid rgb(221, 223, 225);
		}
	}
`;

export default SideBar;