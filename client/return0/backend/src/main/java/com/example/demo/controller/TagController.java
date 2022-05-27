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
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import com.example.demo.dto.JsonResult;
import com.example.demo.vo.JoborderResultVo;
import com.example.demo.vo.PressVo;

@RestController
@RequestMapping("/api")
public class TagController {

	@Value("${gateway.endpoint}")
	private String gatewayEndpoint;

	private final RestTemplate restTemplate;

	public TagController(RestTemplate restTemplate) {
		this.restTemplate = restTemplate;
	}

	@PostMapping("/Tag")
	public ResponseEntity<JsonResult> post(@RequestBody List<Map<String, String>> map) {
//		List[] response = restTemplate.postForObject(String.format("%s/tag/api/Tag", gatewayEndpoint), map, List[].class);
		HttpHeaders headers = new HttpHeaders();
		headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
		HttpEntity<List<Map<String, String>>> entity = new HttpEntity<List<Map<String, String>>>(map, headers);
		System.out.println("1번째 객체:" + entity);

		try {
//			ResponseEntity<List<PressVo>> result = restTemplate.exchange(
//					(String.format("%s/tag/api/Tag", gatewayEndpoint)), HttpMethod.POST, entity,
//					new ParameterizedTypeReference<List<PressVo>>() {
//					});
//
//			System.out.println("최종 결과물:" + result.getBody());
//			return ResponseEntity.ok().body(JsonResult.success(result.getBody()));
			
			PressVo[] response = restTemplate.postForObject(String.format("%s/api/Tag", gatewayEndpoint), entity, PressVo[].class);
			return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(Arrays.asList(response)));

		} catch (HttpStatusCodeException e) {
			System.out.println("[HttpStatusCodeException]");
			System.err.println(e);
			return ResponseEntity.ok().body(JsonResult.fail("fail"));
		} catch (RestClientException e) {
			System.out.println("[RestClientException]");
			System.err.println(e);
			return ResponseEntity.ok().body(JsonResult.fail("fail"));
		}
	}

	@PostMapping("/history")
	public ResponseEntity<JsonResult> post(@RequestBody Map<String, Object> map) {
		System.out.println("클라이언트 진입");
		HttpHeaders headers = new HttpHeaders();
		headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));

		HttpEntity<Map<String, Object>> entity = new HttpEntity<Map<String, Object>>(map, headers);
		System.out.println("1번째 객체:" + entity);

		ResponseEntity<List<Map<String, Object>>> result = restTemplate.exchange(
				(String.format("%s/api/history", gatewayEndpoint)), HttpMethod.POST, entity,
				new ParameterizedTypeReference<List<Map<String, Object>>>() {
				});
		System.out.println("최종 결과물:" + result.getBody());
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(result.getBody()));
	}
}