package com.example.demo.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.web.filter.CorsFilter;

import com.example.demo.security.JwtAuthenticationFilter;

import lombok.extern.slf4j.Slf4j;

@EnableWebSecurity
@Slf4j
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private JwtAuthenticationFilter jwtAuthenticationFilter;

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		System.out.println("[configure]");
		System.out.println(http.toString());
		// http 시큐리티 빌더
		
		http.cors() // WebMvcConfig에서 이미 설정했으므로 기본 cors 설정.
				.and()
				.csrf()// csrf는 현재 사용하지 않으므로 disable
						.disable()
				.httpBasic()// token을 사용하므로 basic 인증 disable
						.disable()
				.sessionManagement()  // session 기반이 아님을 선언
						.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
				.and()
				.authorizeRequests() // /와 /auth/** 경로는 인증 안해도 됨.
					.antMatchers("/", "/auth/**", "/js/**", "/assets/**").permitAll()
                	.antMatchers("/**").authenticated()
                	.anyRequest() // /와 /auth/**이외의 모든 경로는 인증 해야됨.
					.authenticated()
                .and()
                .formLogin()
                	.disable()
                .headers();	//	브라우저가 캐싱하지 않음 - 뒤로가기 누르면 다시 로그인된 이전 페이지로 돌아가는 모순 방지

		       
				
		// filter 등록.
		// 매 리퀘스트마다
		// CorsFilter 실행한 후에
		// jwtAuthenticationFilter 실행한다.
		http.addFilterAfter(
						jwtAuthenticationFilter,
						CorsFilter.class
		);
	}
}