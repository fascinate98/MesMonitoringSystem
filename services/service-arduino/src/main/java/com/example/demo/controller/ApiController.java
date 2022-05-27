package com.example.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.repository.ArduinoRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@CrossOrigin
@RestController
@RequestMapping("/api")
public class ApiController {

	private final ArduinoRepository arduinoRepository;

	public ApiController(ArduinoRepository arduinoRepository) {
		this.arduinoRepository = arduinoRepository;
	}

	@GetMapping("/arduino")
	public ResponseEntity<?> readData() {
//		log.info("Request [GET//arduino]");
		return ResponseEntity.status(HttpStatus.OK).body(arduinoRepository.findall());

	}
}