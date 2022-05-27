package com.example.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.service.ConditionService;
import com.example.demo.vo.IsAbnormalVo;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@CrossOrigin
@RestController
@RequestMapping("/api")
public class ApiController {
	
	private ConditionService conditionService;
	
	public ApiController(ConditionService conditionService) {
		this.conditionService = conditionService;
	}
	
	
	@GetMapping("/condition")
	public ResponseEntity<?> abnormalRead() {
		log.info("Request [GET//abnormalRead]");
		try {
			return ResponseEntity.status(HttpStatus.OK).body(conditionService.readCondition());
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	// 생산이상 등록
	@PostMapping("/condition")
	public ResponseEntity<?> abnormalInsert(@RequestBody IsAbnormalVo isAbnormalVo) {
		System.out.println("-----controller-----");
		System.out.println(isAbnormalVo);
		System.out.println("-----controller-----");

		return ResponseEntity.status(HttpStatus.OK)
				.body(conditionService.insertCondition(isAbnormalVo));
	}
}