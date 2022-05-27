package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.repository.ConditionRepository;
import com.example.demo.vo.IsAbnormalVo;

@Service
public class ConditionService {

	private ConditionRepository conditionRepository;
	
	public ConditionService(ConditionRepository conditionRepository) {
		this.conditionRepository = conditionRepository;
	}

	// 생산 이상 조회
	public List<IsAbnormalVo> readCondition() {
		List<IsAbnormalVo> i = conditionRepository.readCondition(); 
		System.out.println("=====condition=====");
		System.out.println(i);
		System.out.println("=====condition=====");
		return i;
	}

	// 생산 이상 등록
	public Boolean insertCondition(IsAbnormalVo isAbnormalVo) {
		conditionRepository.insertCondition(isAbnormalVo);	
		return true;

	}

}