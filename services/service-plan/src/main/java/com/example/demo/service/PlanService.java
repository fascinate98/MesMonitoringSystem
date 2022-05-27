package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.repository.PlanRepository;
import com.example.demo.vo.JoborderVo;

@Service
public class PlanService {

	@Autowired
	private PlanRepository planRepository;

	// 생산 계획 조회
	public List<JoborderVo> readPlan(String keyword) {
  

		return planRepository.findPlan(keyword);
	}

	// 생산 계획 등록
	public Boolean insertPlan(JoborderVo joborderVo) {

	

		planRepository.insertPlan(joborderVo);
		int key = planRepository.selectKey(joborderVo);
		joborderVo.setJoborderId(key);
		planRepository.updateLine(joborderVo);

		joborderVo.setJoborderQr(joborderVo.getJoborderQr());
		return true;

	}
	//
	// public JoborderVo insertPlan(JoborderVo joborderVo) {
	//
	// System.out.println("-----service-----");
	// System.out.println("-----service-----");
	//// joborderVo.setJoborderQr(joborderVo.getJoborderQr());
	// return planRepository.selectQr(joborderVo);
	//
	// }

}
