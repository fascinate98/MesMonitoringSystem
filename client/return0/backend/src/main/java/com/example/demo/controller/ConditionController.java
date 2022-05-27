package com.example.demo.controller;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.example.demo.dto.JsonResult;
import com.example.demo.vo.IsAbnormalVo;

@RestController
@RequestMapping("/api")

public class ConditionController {
	
	
	@Value("${gateway.endpoint}")
	private String gatewayEndpoint;
	
	
	private final RestTemplate restTemplate;
	
	public ConditionController(RestTemplate restTemplate) {
		this.restTemplate = restTemplate;
	}	
	
	@GetMapping("/condition")
	public ResponseEntity<JsonResult> get(){
		System.out.println("게이트웨이:"+gatewayEndpoint);
		
		IsAbnormalVo[] response = restTemplate.getForObject(String.format("%s/api/condition", gatewayEndpoint), IsAbnormalVo[].class);
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(Arrays.asList(response)));

	}
	
	@PostMapping("/condition")
	public ResponseEntity<JsonResult> post(@RequestBody IsAbnormalVo vo) {
		IsAbnormalVo response = restTemplate.postForObject(String.format("%s/api/condition", gatewayEndpoint), vo, IsAbnormalVo.class);
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(response));
	}
	

}
