package com.example.demo.repository;

import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class DashboardRepository {
	@Autowired
	private SqlSession sqlSession;

	public Map<String, Object> countDashboard() {
		return sqlSession.selectOne("dashboard.countDashboard");
	}

}
