package com.example.demo.controller;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.example.demo.dto.JsonResult;
import com.example.demo.vo.ArduinoVo;

@RestController
@RequestMapping("/api")
public class ArduinoController {

		
		@Value("${gateway.endpoint}")
		private String gatewayEndpoint;
		
		
		private final RestTemplate restTemplate;
		
		public ArduinoController(RestTemplate restTemplate) {
			this.restTemplate = restTemplate;
		}	
		
		@GetMapping("/arduino")
		public ResponseEntity<JsonResult> get(){
			System.out.println("게이트웨이:"+gatewayEndpoint);
			
			ArduinoVo response = restTemplate.getForObject(String.format("%s/api/arduino", gatewayEndpoint), ArduinoVo.class);
			return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(response));

		}
		
}
