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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.example.demo.dto.JsonResult;
import com.example.demo.vo.JoborderVo;


@RestController
@RequestMapping("/api")
public class PlanController {
	
	@Value("${gateway.endpoint}")
	private String gatewayEndpoint;
	
	
	private final RestTemplate restTemplate;
	
	public PlanController(RestTemplate restTemplate) {
		this.restTemplate = restTemplate;
	}	


	// 생산계획조회
	@GetMapping("/plan")
	public ResponseEntity<JsonResult> get(@RequestParam(value = "kw", required = true, defaultValue = "") String keyword){
		System.out.println("게이트웨이:"+gatewayEndpoint);
		JoborderVo[] response = restTemplate.getForObject(String.format("%s/api/plan?kw=%s", gatewayEndpoint, keyword), JoborderVo[].class);
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(Arrays.asList(response)));

	}
	
	// 생산계획 세부조회
	@PostMapping("/plan")
	public ResponseEntity<JsonResult> post(@RequestBody Map<String, String> map){
		HttpHeaders headers = new HttpHeaders();
	      headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
	      
	      HttpEntity<Map<String, String>> entity = new HttpEntity<Map<String, String>> (map,headers);
	      System.out.println("1번째 객체:"+entity);
	      
	      ResponseEntity<List<JoborderVo>> result = restTemplate.exchange(
	    		  (String.format("%s/api/plan", gatewayEndpoint)), HttpMethod.POST, entity, 
	    		  new ParameterizedTypeReference<List<JoborderVo>>(){
			});
		  System.out.println("최종 결과물:"+result.getBody());
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(result.getBody()));
		
	}
	// 생산계획등록
	@PostMapping("/registration")
	public ResponseEntity<JsonResult> post(@RequestBody JoborderVo vo) {
		JoborderVo response = restTemplate.postForObject(String.format("%s/api/registration", gatewayEndpoint), vo, JoborderVo.class);
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(response));
	}
	
	// qr
	@GetMapping("/qr")
	public ResponseEntity<JsonResult> get() {
		String response = restTemplate.getForObject(String.format("%s/api/qr", gatewayEndpoint), String.class);
		System.out.println("controller 단");
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(response));
	}	
}
