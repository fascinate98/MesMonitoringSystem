package com.example.demo.repository;

import java.util.HashMap;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.demo.model.UserEntity;
import com.example.demo.vo.UserVo;

@Repository
public class UserRepository {

	@Autowired
	private SqlSession sqlSession;

	public UserVo findByEmailAndPassword(UserVo vo) {
		return sqlSession.selectOne("user.findByIdAndPassword", vo);
	}
	
	public UserEntity findById(String id){
		return sqlSession.selectOne("user.findById", id);
	}
	
//	public Boolean existsByEmail(String email){
//		return sqlSession.selectOne("user.existsByEmail", email);
//	}
	
	public UserEntity findByEmailAndPassword(String email, String password){
		return sqlSession.selectOne("user.findByEmailAndPassword", new HashMap<String, Object>() {
			{
				put("email", email);
				put("password", password);
			}
		});
	}

	public boolean insertUser(UserEntity userEntity) {
		System.out.println("[UserRepository-insertUser] : " + userEntity);
		return sqlSession.insert("user.insert", userEntity)==1;
	}
}