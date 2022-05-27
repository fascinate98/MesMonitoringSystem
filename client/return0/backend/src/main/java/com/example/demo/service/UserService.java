package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.model.UserEntity;
import com.example.demo.repository.UserRepository;
import com.example.demo.vo.UserVo;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;
	
	public UserEntity create(final UserEntity userEntity) {
		if(userEntity == null) {
			throw new RuntimeException("Invalid arguments");
		}
		userRepository.insertUser(userEntity);	//	회원가입 걍 만들었음 
		return userEntity;
	}
	public UserEntity getByCredentials(final String id, final String password, final PasswordEncoder encoder) {
		final UserEntity originalUser = userRepository.findById(id);
		System.out.println("[getByCredentials] originalUser : " + originalUser);
		
		
		// matches 메서드를 이용해 패스워드가 같은지 확인
		System.out.println(password + "  " + originalUser.getUserPw());
		System.out.println(encoder.matches(password, originalUser.getUserPw()));
		if(originalUser != null && encoder.matches(password, originalUser.getUserPw())) {
			return originalUser;
		}
		return null;
	}
}