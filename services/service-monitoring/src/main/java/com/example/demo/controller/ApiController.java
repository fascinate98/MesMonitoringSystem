package com.example.demo.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.repository.MonitoringRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@CrossOrigin
@RestController
@RequestMapping("/api")
public class ApiController {

	private final MonitoringRepository monitoringRepository;
	
	public ApiController(MonitoringRepository monitoringRepository) {
		this.monitoringRepository = monitoringRepository;
	}


	// 공정 모니터링
	@PostMapping("/monitoring")
	public ResponseEntity<?> index(@RequestBody Map<String, String> index) {


		log.info("Request [POST/api/monitoring]");
		try {
			System.out.println(monitoringRepository.findAll(index)+ "ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ");
			return ResponseEntity.status(HttpStatus.OK).body(monitoringRepository.findAll(index));
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}

	}


}