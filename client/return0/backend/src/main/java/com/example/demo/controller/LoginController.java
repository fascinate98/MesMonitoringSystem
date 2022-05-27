package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.UserEntity;
import com.example.demo.security.TokenProvider;
import com.example.demo.service.UserService;
import com.example.demo.vo.ResponseVo;
import com.example.demo.vo.UserVo;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/auth")
public class LoginController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private TokenProvider tokenProvider;
	
	// Bean으로 작성해도 됨.
	private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@RequestBody UserVo userDTO) {
		log.info("Request [POST/auth/signup]");
		try {
			// 리퀘스트를 이용해 저장할 유저 만들기
			UserEntity user = UserEntity.builder()
							.userId(userDTO.getUserId())
							.userName(userDTO.getUserName())
							.userWorktype(userDTO.getUserWorktype())
							.userGroup(userDTO.getUserGroup())
							.userPw(passwordEncoder.encode(userDTO.getUserPw()))
							.build();
			System.out.println(user);
			
			// 서비스를 이용해 리파지토리에 유저 저장
			UserEntity registeredUser = userService.create(user);
			System.out.println(registeredUser);
			
			UserVo responseUserDTO = UserVo.builder()
//							.email(registeredUser.getEmail())
							.userId(userDTO.getUserId())
							.userWorktype(userDTO.getUserWorktype())
							.userGroup(userDTO.getUserGroup())
							.userId(registeredUser.getUserId())
							.userName(registeredUser.getUserName())
							.build();
			System.out.println(responseUserDTO);
			
			// 유저 정보는 항상 하나이므로 그냥 리스트로 만들어야하는 ResponseDTO를 사용하지 않고 그냥 UserDTO 리턴.
			return ResponseEntity.ok(responseUserDTO);
		} catch (Exception e) {
			// 예외가 나는 경우 bad 리스폰스 리턴.
			ResponseVo responseDTO = ResponseVo.builder().error(e.getMessage()).build();
			return ResponseEntity
							.badRequest()
							.body(responseDTO);
		}
	}

	@PostMapping("/signin")
	public ResponseEntity<?> authenticate(@RequestBody UserVo userDTO) {
		System.out.println(userDTO);
		UserEntity user = userService.getByCredentials(
						userDTO.getUserId().toString(),
						userDTO.getUserPw(),
						passwordEncoder);
		System.out.println(user);
		
		
		if(user != null) {
			// 토큰 생성
			final String token = tokenProvider.create(user);
			System.out.println("[authenticate] : " + token);
			final UserVo responseUserDTO = UserVo.builder()
//							.email(user.getUsername())
							.userName(user.getUserName())
							.userId(user.getUserId())
							.token(token)
							.build();
			return ResponseEntity.ok().body(responseUserDTO);
		} else {
			ResponseVo responseDTO = ResponseVo.builder()
							.error("Login failed.")
							.build();
			return ResponseEntity
							.badRequest()
							.body(responseDTO);
		}
	}
	
}