package com.example.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.repository.DashboardRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@CrossOrigin
@RestController
@RequestMapping("/api")
public class ApiController {
	
	private final DashboardRepository dashboardRepository;
	
	public ApiController(DashboardRepository dashboardRepository) {
		this.dashboardRepository = dashboardRepository;
	}	

	// 대시보드
	@GetMapping("/dashboard")
	public ResponseEntity<?> readDashboard() {
//		log.info("Request [GET /api/dashboard]");
		return ResponseEntity.status(HttpStatus.OK).body(dashboardRepository.countDashboard());

	}

}