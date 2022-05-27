package com.example.demo.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.example.demo.dto.JsonResult;

@RestController
@RequestMapping("/api")
public class DashboardController {
	
	@Value("${gateway.endpoint}")
	private String gatewayEndpoint;
	
	
	private final RestTemplate restTemplate;
	
	public DashboardController(RestTemplate restTemplate) {
		this.restTemplate = restTemplate;
	}
	
	@GetMapping("/dashboard")
	public ResponseEntity<JsonResult> get(){
		System.out.println("게이트웨이:"+gatewayEndpoint);

		Map response = restTemplate.getForObject(String.format("%s/api/dashboard", gatewayEndpoint), Map.class);
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(response));

	}
}
