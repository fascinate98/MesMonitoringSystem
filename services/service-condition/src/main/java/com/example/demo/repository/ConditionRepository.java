package com.example.demo.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.demo.vo.IsAbnormalVo;

@Repository
public class ConditionRepository {

	@Autowired
	private SqlSession sqlSession;

	// 생산 계획 조회
	public List<IsAbnormalVo> readCondition() {
		System.out.println("[생산이상조회]");

		return sqlSession.selectList("condition.readCondition");
	}
	
	public Boolean insertCondition(IsAbnormalVo isAbnormalVo) {
		System.out.println("[생산이상등록]");
		
		return sqlSession.insert("condition.insertCondition", isAbnormalVo) == 1;
	}

}