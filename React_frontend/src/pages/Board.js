import React from "react"
import BoardList from "../components/\bBoard/BordList"
import styled from "styled-components"
import SideBar from "../components/\bBoard/SideBar"
import ContentHeader from "../components/\bBoard/ContentHeader"
import { Outlet } from "react-router-dom";

const Board = () =>{
    return(
        <BoardWrapper>
         <Header>
             <h1>영화 커뮤니티</h1>
         </Header>
         <ContentWrapper>
             <SideBar />
             <Card>
             <Outlet />
             </Card>
         </ContentWrapper>
        </BoardWrapper>
     )
 }
 const BoardWrapper = styled.div`
 padding: 0;
   width: 1235px;
   margin : 0 auto;
   box-sizing: border-box; 
   margin-bottom: 0;
 
 `
 const Header = styled.div`
     width:100%;
     height:50px;
     border-bottom:3px solid black;
 
     h1{
         font-weight:1000;
         padding-left:50px;
     }
 `
 const ContentWrapper = styled.div`
 display: flex;
 width: 1060px;
 padding: 50px 0px 80px;
 margin: 0px auto;
 flex-direction: row;
 -webkit-box-pack: justify;
 justify-content: space-between;
 
 `
 const Card = styled.div`
 float: right;
 box-sizing: border-box;
 width: 728px;`
 
 export default Board;