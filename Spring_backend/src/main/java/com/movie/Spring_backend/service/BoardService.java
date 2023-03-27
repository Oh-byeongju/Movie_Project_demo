package com.movie.Spring_backend.service;

import com.movie.Spring_backend.dto.BoardDto;
import com.movie.Spring_backend.dto.MovieInfoDto;
import com.movie.Spring_backend.entity.*;
import com.movie.Spring_backend.jwt.JwtValidCheck;
import com.movie.Spring_backend.repository.BoardLikeRepository;
import com.movie.Spring_backend.repository.BoardRepository;
import com.movie.Spring_backend.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BoardService {
    private final JwtValidCheck jwtValidCheck;
    private final BoardRepository boardRepository;

    private final BoardLikeRepository boardLikeRepository;


    //게시글을 전체 불러오는 메소드 ,최신순
    @Transactional
    public Page<BoardDto> PaginationBid(Integer index,String category){

        PageRequest page = PageRequest.of(index,20);   //(페이지 순서, 단일 페이지 크기)

        //자유 게시판
        Page<BoardEntity> pages = boardRepository.PaginationBid(page,category);

           return pages.map(data -> BoardDto.builder().bid(data.getBid()).btitle(data.getBtitle()).bdetail(data.getBdetail())
                    .bcategory(data.getBcategory()).bdate(data.getBdate()).bdate(data.getBdate()).bclickindex(data.getBclickindex())
                   .thumb(data.getThumb()).blike(data.getLike()).bunlike(data.getBunlike()).commentcount(data.getCommentcount()).uid(data.getMember().getUid()).
                    build());


    }
    //게시글 전체 불러오는 메소드, top순
    @Transactional
    public Page<BoardDto> PaginationIndex(Integer index, String category){

        PageRequest page = PageRequest.of(index,20);   //(페이지 순서, 단일 페이지 크기)
        Page<BoardEntity> pages = boardRepository.PaginationIndex(page, category);
        return pages.map(data -> BoardDto.builder().bid(data.getBid()).btitle(data.getBtitle()).bdetail(data.getBdetail())
                .bcategory(data.getBcategory()).bdate(data.getBdate()).bdate(data.getBdate()).bclickindex(data.getBclickindex())
                .thumb(data.getThumb()).blike(data.getLike()).bunlike(data.getBunlike()).commentcount(data.getCommentcount()).uid(data.getMember().getUid()).build());
    }
    //게시글 전체 불러오는 메소드, 좋아요순

    @Transactional
    public Page<BoardDto> Test1(Integer index ,String category){
        PageRequest page = PageRequest.of(index,20);   //(페이지 순서, 단일 페이지 크기)

        Page<BoardEntity> datas = boardRepository.LikesTop(page,category);

        return datas.map(data -> BoardDto.builder().bid(data.getBid()).btitle(data.getBtitle()).bdetail(data.getBdetail())
                .bcategory(data.getBcategory()).bdate(data.getBdate()).bdate(data.getBdate()).bclickindex(data.getBclickindex())
                .thumb(data.getThumb()).blike(data.getLike()).bunlike(data.getBunlike()).commentcount(data.getCommentcount()).uid(data.getMember().getUid()).build());


    }


    //게시글 상세 페이지를 불러오느 메소드
    //게시글 조회수 +1
    @Transactional
    public List<BoardDto> findByContent(Long id , String title){
        boardRepository.updateViews(id);
        List<BoardEntity> datas = boardRepository.findByContent(id,title);

        String User_id = SecurityUtil.getCurrentMemberId();
        boolean liked= false;
        boolean unliked = false;
        BoardLikeEntity checklike = boardLikeRepository.findByLike(id, User_id);
        BoardLikeEntity checkunlike = boardLikeRepository.findByUnLike(id, User_id);


        if (checklike == null) {
            liked=false;
        }
        if(checklike !=null){
            liked=true;
        }
        if(checkunlike ==null){
            unliked=false;
        }
        if(checkunlike!=null){
            unliked=true;
        }

        boolean finalUnliked = unliked;
        boolean finalLiked = liked;
        return datas.stream().map(data -> BoardDto.builder().bid(data.getBid()).btitle(data.getBtitle()).bdetail(data.getBdetail())
                .bcategory(data.getBcategory()).bdate(data.getBdate()).bclickindex(data.getBclickindex()).blike(data.getLike())
                .bunlike(data.getBunlike()).likes(finalLiked).unlikes(finalUnliked)
                .commentcount(data.getCommentcount()).uid(data.getMember().getUid()).build()).collect(Collectors.toList());
    }

    //페이지내 제목으로 검색하는 메소드
    @Transactional
    public Page<BoardDto> SearchTitle(Integer index, String title){
        PageRequest page = PageRequest.of(index,20);   //(페이지 순서, 단일 페이지 크기)
        Page<BoardEntity> pages = boardRepository.SearchTitle(page, title);
        return pages.map(data -> BoardDto.builder().bid(data.getBid()).btitle(data.getBtitle()).bdetail(data.getBdetail())
                .bcategory(data.getBcategory()).bdate(data.getBdate()).bdate(data.getBdate()).bclickindex(data.getBclickindex())
                .thumb(data.getThumb()).blike(data.getLike()).bunlike(data.getBunlike()).commentcount(data.getCommentcount()).uid(data.getMember().getUid()).build());
    }

    //페이지내 이름으로 검색하는 메소드
    @Transactional
    public Page<BoardDto> SearchUid(Integer index, String uid){
        PageRequest page = PageRequest.of(index,20);   //(페이지 순서, 단일 페이지 크기)
        Page<BoardEntity> pages = boardRepository.SearchUid(page, uid);
        return pages.map(data -> BoardDto.builder().bid(data.getBid()).btitle(data.getBtitle()).bdetail(data.getBdetail())
                .bcategory(data.getBcategory()).bdate(data.getBdate()).bdate(data.getBdate()).bclickindex(data.getBclickindex())
                .thumb(data.getThumb()).blike(data.getLike()).bunlike(data.getBunlike()).commentcount(data.getCommentcount()).uid(data.getMember().getUid()).build());
    }

    //게시판에 글을 작성하는 메소드
    @Transactional
    public void BoardWrite(Map<String, String> requestMap, HttpServletRequest request) {

        // Access Token에 대한 유효성 검사
        jwtValidCheck.JwtCheck(request, "ATK");
        String User_id = SecurityUtil.getCurrentMemberId();
        String title = requestMap.get("title").trim();
        String detail = requestMap.get("detail").trim();
        String category = requestMap.get("category").trim();

        Date nowDate = new Date();

        SimpleDateFormat DateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String day = DateFormat.format(nowDate);
        MemberEntity member = MemberEntity.builder().uid(User_id).build();
        BoardEntity Board;

        Pattern pattern  =  Pattern.compile("<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>");
            Matcher match = pattern.matcher(detail);

            String imgTag;

            if (match.find()) { // 이미지 태그를 찾았다면,,
                imgTag = match.group(0); // 글 내용 중에 첫번째 이미지 태그를 뽑아옴.
            } else {
                imgTag = null;
            }
            System.out.println("imgTag : " + imgTag);



            Board = BoardEntity.builder()
                    .btitle(title)
                    .bdate(day)
                    .bdetail(detail)
                    .bcategory(category)
                    .bclickindex(0)
                    .member(member)
                    .thumb(imgTag)
                    .build();
        boardRepository.save(Board);
    }

    //좋아요 구현 메소드
    //comment_like
    //like
    @Transactional
    public BoardDto like(Map<String, String> requestMap,HttpServletRequest request){
        jwtValidCheck.JwtCheck(request, "ATK");

        boolean liked= false;
        boolean unliked = false;

        String like = requestMap.get("like");
        String unlike = requestMap.get("unlike");
        String User_id = SecurityUtil.getCurrentMemberId();
        String board = requestMap.get("board");

        BoardEntity bid = BoardEntity.builder().bid(Long.valueOf(board)).build();
        MemberEntity member = MemberEntity.builder().uid(User_id).build();
        BoardLikeEntity boardLike = boardLikeRepository.findByLike(Long.valueOf(board), User_id);
        BoardLikeEntity boardUnLike = boardLikeRepository.findByUnLike(Long.valueOf(board), User_id);
        BoardLikeEntity boardLikeEntity;
        boardLikeEntity = BoardLikeEntity.builder().
                blike(Integer.valueOf(like))
                .board(bid)
                .bunlike(Integer.valueOf(unlike))
                .member(member)
                .build();
        if(boardLike==null && like.equals("1")) {
            System.out.println("추가");
            boardLikeRepository.save(boardLikeEntity);
        }
        else if(boardUnLike==null && unlike.equals("1")){
            boardLikeRepository.save(boardLikeEntity);
        }
        else if (boardUnLike!=null && unlike.equals("1")){
            boardLikeRepository.Deleted(Long.valueOf(board),User_id,0,1);
        }
        else{
            System.out.println("삭제");
            boardLikeRepository.Deleted(Long.valueOf(board),User_id,1,0);
        }
        BoardEntity datas = boardRepository.booleanCheck(Long.valueOf(board));


        BoardLikeEntity checklike = boardLikeRepository.findByLike(Long.valueOf(board), User_id);
        BoardLikeEntity checkunlike = boardLikeRepository.findByUnLike(Long.valueOf(board), User_id);


        if (checklike == null) {
            liked=false;
        }
        if(checklike !=null){
            liked=true;
        }
        if(checkunlike ==null){
            unliked=false;
        }
        if(checkunlike!=null){
            unliked=true;
        }
        return BoardDto.builder().bid(datas.getBid()).likes(liked).unlikes(unliked).blike(datas.getLike()).bunlike(datas.getBunlike()).build();
    }

    @Transactional
    public void deleteBoard(Map<String, String> requestMap, HttpServletRequest request){
        jwtValidCheck.JwtCheck(request, "ATK");

        String bid = requestMap.get("bid");


     boardRepository.deleteById(Long.valueOf(bid));
    }


}
