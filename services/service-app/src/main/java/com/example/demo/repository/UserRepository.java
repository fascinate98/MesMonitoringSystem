package com.example.demo.repository;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.demo.vo.UserVo;

@Repository
public class UserRepository {
	
	@Autowired
	private SqlSession sqlSession;

	public UserVo findByEmailAndPassword(UserVo vo) {
		System.out.println(vo);
		return sqlSession.selectOne("user.findByIdAndPassword", vo);
	}

}
