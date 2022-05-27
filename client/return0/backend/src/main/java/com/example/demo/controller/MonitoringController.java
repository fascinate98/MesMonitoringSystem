package com.example.demo.controller;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.example.demo.dto.JsonResult;

@RestController
@RequestMapping("/api")
public class MonitoringController {
	
	@Value("${gateway.endpoint}")
	private String gatewayEndpoint;
	
	
	private final RestTemplate restTemplate;
	
	public MonitoringController(RestTemplate restTemplate) {
		this.restTemplate = restTemplate;
	}	
	
	@PostMapping("/monitoring")
	public ResponseEntity<JsonResult> post(@RequestBody Map<String, String> index) {
		HttpHeaders headers = new HttpHeaders();
	      headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
	      
	      HttpEntity<Map<String, String>> entity = new HttpEntity<Map<String, String>> (index,headers);
	      System.out.println("1번째 객체:"+entity);
	      
	      ResponseEntity<List<Map<String,Object>>> result = restTemplate.exchange(
	    		  (String.format("%s/api/monitoring", gatewayEndpoint)), HttpMethod.POST, entity, 
	    		  new ParameterizedTypeReference<List<Map<String,Object>>>(){
			});
		  System.out.println("최종 결과물:"+result.getBody());
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(result.getBody()));
	}
	
}
