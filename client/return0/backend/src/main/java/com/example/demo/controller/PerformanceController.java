package com.example.demo.controller;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.example.demo.dto.JsonResult;
import com.example.demo.vo.JoborderResultVo;
import com.example.demo.vo.JoborderVo;

@RestController
@RequestMapping("/api")
public class PerformanceController {
	
	@Value("${gateway.endpoint}")
	private String gatewayEndpoint;
	
	
	private final RestTemplate restTemplate;
	
	public PerformanceController(RestTemplate restTemplate) {
		this.restTemplate = restTemplate;
	}	

	// 생산 실적 조회
	@GetMapping("/performance")
	public ResponseEntity<JsonResult> get(){
		System.out.println("게이트웨이:"+gatewayEndpoint);

		JoborderResultVo[] response = restTemplate.getForObject(String.format("%s/api/performance", gatewayEndpoint), JoborderResultVo[].class);
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(Arrays.asList(response)));

	}
	
	@GetMapping("/performance/{joborderJobname}")
	public ResponseEntity<JsonResult> get2(@PathVariable("joborderJobname") String joborderJobname){
		System.out.println("게이트웨이:"+gatewayEndpoint);

		JoborderVo[] response = restTemplate.getForObject(String.format("%s/api/performance"+ joborderJobname, gatewayEndpoint), JoborderVo[].class);
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(Arrays.asList(response)));

	}	
	
	@PostMapping("/performance")
	public ResponseEntity<JsonResult> post(@RequestBody JoborderResultVo vo) {
		JoborderResultVo response = restTemplate.postForObject(String.format("%s/api/performance", gatewayEndpoint), vo, JoborderResultVo.class);
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(response));
	}
	
	@PutMapping("/performance")
	public ResponseEntity<JsonResult> put(@RequestBody JoborderResultVo vo) {
		JoborderResultVo response = restTemplate.postForObject(String.format("%s/api/performanceupdate", gatewayEndpoint), vo, JoborderResultVo.class);
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(response));
	}
}
