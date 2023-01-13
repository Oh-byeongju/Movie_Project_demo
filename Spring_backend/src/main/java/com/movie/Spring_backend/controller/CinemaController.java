package com.movie.Spring_backend.controller;

import com.movie.Spring_backend.service.CinemaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.movie.Spring_backend.dto.CinemaDto;

import javax.servlet.http.HttpServlet;
import java.util.List;

@RestController // JSON 형태 결과값을 반환해줌 (@ResponseBody가 필요없음)
@RequiredArgsConstructor // final 객체를 Constructor Injection 해줌. (Autowired 역할)
@RequestMapping("/v1")
@CrossOrigin(origins = "http://localhost:3000")
public class CinemaController extends HttpServlet {
    //리액트 -> 컨트롤러 전달
    CinemaService cinemaservice;

    @GetMapping(value = "/showlist")
    public ResponseEntity<List<CinemaDto.CinemaSelect>> showList() {
        List<CinemaDto.CinemaSelect> cinemas= cinemaservice.showList();
        return new ResponseEntity<>(cinemas, HttpStatus.OK);
    }
}