package com.movie.Spring_backend.service;

import com.movie.Spring_backend.util.DeduplicationUtil;
import com.movie.Spring_backend.dto.CinemaDto;
import com.movie.Spring_backend.dto.MovieDto;
import com.movie.Spring_backend.entity.*;
import com.movie.Spring_backend.mapper.MovieMapper;
import com.movie.Spring_backend.repository.CinemaRepository;
import com.movie.Spring_backend.repository.MovieInfoRepository;
import com.movie.Spring_backend.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CinemaService {
    private final CinemaRepository cinemaRepository;

    @Transactional
    public List<Long> findByTheaterday(Long id) {
        //외래키 검색을 위해 엔티티 매핑
        TheaterEntity theaterEntity = TheaterEntity.builder().tid(id).build();

        //위에서 매핑한 theater엔티티를 이용해서 cinema에서 cid 추출하기
        List<CinemaEntity> datas = cinemaRepository.findByTheater(theaterEntity);
        List<Long> mappedcid = new ArrayList<>();
        //cid 추출
        for (CinemaEntity cc : datas) {
            mappedcid.add(cc.getCid());
        }
        return mappedcid;
    }

    @Transactional
    public List<CinemaDto> findall(){

        List<CinemaEntity> datas = cinemaRepository.findAll();

        return datas.stream().map((data)->
                CinemaDto.builder().cid(data.getCid()).cname(data.getCname()).ctype(data.getCtype()).cseat(data.getCseat())
                        .tname(data.getTheater().getTname()).tid(data.getTheater().getTid()).build()).collect(Collectors.toList());
    }

     @Transactional
     public void insert(@RequestBody Map<String, String> requestMap, HttpServletRequest request) {

            String tid = requestMap.get("tid").trim();
            String cid = requestMap.get("cid").trim();
            String name = requestMap.get("cname").trim();
            String type = requestMap.get("ctype").trim();
            String seat = requestMap.get("cseat").trim();
            String state = requestMap.get("state").trim();

            TheaterEntity theater = TheaterEntity.builder().tid(Long.valueOf(tid)).build();

            if(state.equals("insert")){
            if(!tid.equals("") && !name.equals("") && !type.equals("") && !seat.equals("")) {
                CinemaEntity cinema;
                cinema = CinemaEntity.builder()
                        .cname(name)
                        .ctype(type)
                        .cseat(Integer.valueOf(seat))
                        .theater(theater)
                        .build();
                cinemaRepository.save(cinema);
            }
            else {
                System.out.println("입력 불가합니다.");
        }}
            else if(state.equals("update")){
                cinemaRepository.updateCinema(name,type, Integer.valueOf(seat), Long.valueOf(cid));
            }
            else if(state.equals("delete")){
                cinemaRepository.deleteById(Long.valueOf(cid));
            }
    }

}

