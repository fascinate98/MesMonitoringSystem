package com.example.demo.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.demo.vo.JoborderVo;

@Repository
public class PlanRepository {

	@Autowired
	private SqlSession sqlSession;

	// 생산 계획 조회
	public List<JoborderVo> findPlan(String keyword) {
		System.out.println("[생산계획조회]");
		System.out.println("-----repository-----");
		System.out.println(keyword);
		System.out.println("-----repository-----");

		return sqlSession.selectList("plan.findPlan", keyword);
	}
	
	//	생산 계획 조회 ( 세부 사항 )
	public List<JoborderVo> findPlanByJoborderId(String joborderId) {
		return sqlSession.selectList("plan.findPlanByJoborderId", joborderId);
	}		
	
	public List<JoborderVo> findQr() {
		System.out.println("[생산계획조회]");
		System.out.println("-----repository-----");
		System.out.println("-----repository-----");

		return sqlSession.selectList("plan.findPlan");
	}
	
	
	
	
	public int selectKey(JoborderVo joborderVo) {

		return sqlSession.selectOne("plan.findId", joborderVo);
	}

	// 생산 계획 조회 ( 세부 사항 )
//	public List<JoborderVo> findAllDetails(String keyword) {
//		return sqlSession.selectList("plan.findDetails", keyword);
//	}	
//	

	// 생산 계획 등록
	public Boolean insertPlan(JoborderVo joborderVo) {
		System.out.println("-----repository-----");
		System.out.println(joborderVo);
		System.out.println("-----repository-----");

		return sqlSession.insert("plan.insertPlan", joborderVo) == 1;
	}

	public Boolean updateLine(JoborderVo joborderVo) {
		return sqlSession.update("plan.updateLine", joborderVo) == 1;
	}

	// Qr

	public String makeQR() {
		return sqlSession.selectOne("plan.makeQR");
	}

}
