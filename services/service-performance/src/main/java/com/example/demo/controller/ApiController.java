package com.example.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.repository.PerformanceRepository;
import com.example.demo.service.PerformanceService;
import com.example.demo.vo.JoborderResultVo;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@CrossOrigin
@RestController
@RequestMapping("/api")
public class ApiController {

	private final PerformanceRepository performanceRepository;
	private final PerformanceService performanceService;
	
	public ApiController(PerformanceRepository performanceRepository,
						PerformanceService performanceService) {
		this.performanceRepository = performanceRepository;
		this.performanceService = performanceService;
	}


	// 앱 통신
	@GetMapping("/performance/{joborderJobname}")
	public ResponseEntity<?> appRead(@PathVariable("joborderJobname") String joborderJobname) {
		log.info("Request [GET//performance addRead]");
		System.out.println("-----controller-----");
		System.out.println(joborderJobname);
		System.out.println("-----controller-----");

		return ResponseEntity.status(HttpStatus.OK)
				.body(performanceRepository.conPerformance(joborderJobname));
	}
	
	// 생산 실적 조회
	@GetMapping("/performance")
	public ResponseEntity<?> readPerformance() {
		System.out.println("-----controller-----");
		System.out.println("생산실적 조회");
		System.out.println("-----controller-----");
		return ResponseEntity.status(HttpStatus.OK).body(performanceRepository.findAll());

	}

	// 앱 생산실적 시작
	@PostMapping("/performance")
	public ResponseEntity<?> appInsert(@RequestBody JoborderResultVo joborderResultVo) {
		System.out.println("-----controller-----");
		System.out.println(joborderResultVo);
		System.out.println("-----controller-----");

		return ResponseEntity.status(HttpStatus.OK)
				.body(performanceService.insertPerformance(joborderResultVo));
	}

	// 앱 생산실적 마무리
	@PostMapping("/performanceupdate")
	public ResponseEntity<?> appUpdate(@RequestBody JoborderResultVo joborderResultVo) {

		System.out.println("-----controller-----");
		System.out.println(joborderResultVo);
		System.out.println("-----controller-----");

		return ResponseEntity.status(HttpStatus.OK)
				.body(performanceService.updatePerformance(joborderResultVo));
	}



}