// 23-01-16 Security 기본적인 설정 구현(오병주)
package com.movie.Spring_backend.config;

import com.movie.Spring_backend.jwt.JwtAccessDeniedHandler;
import com.movie.Spring_backend.jwt.JwtAuthenticationEntryPoint;
import com.movie.Spring_backend.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.stereotype.Component;

// Spring Security의 기본적인 설정을 클래스
@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
@Component
public class WebSecurityConfig {

    private final TokenProvider tokenProvider;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

    // request로부터 받은 비밀번호를 암호화하기 위해 PasswordEncoder 메소드를 Bean 객체로 생성
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // 실질적인 로직인 filterChain 메소드 HttpSecurity를 Configuring해서 사용
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // https만 사용하기위해 httpBasic을 disable
                .httpBasic().disable()
                // 리액트와 스프링부트 사이에 REST API 사용을 위해 csrf 방지 disable
                .csrf().disable()
                // REST API를 통해 세션 없이 토큰을 주고받으며 데이터를 주고받기 때문에 세션설정을 STATELESS로 설정
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                // 사전에 만든 예외처리를 위한 클래스를 추가
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler)

                // 모든 Requests에서 /normal/**를 제외한 모든 uri의 request는 로그인 토큰이 필요
                // 현재는 개발초기라 기능 미구현
                .and()
                .authorizeRequests()
                .antMatchers("/normal/**").permitAll()
                .anyRequest().authenticated()

                // 사전에 만든 JwtSecurityConfig 클래스를 통해 tokenProvider를 적용
                .and()
                .apply(new JwtSecurityConfig(tokenProvider));

        return http.build();
    }
}