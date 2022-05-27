package com.example.demo.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.repository.TagTrendRepository;
import com.example.demo.vo.PressVo;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@CrossOrigin
@RestController
@RequestMapping("/api")
public class ApiController {
	
	private final TagTrendRepository tagTrendRepository;
	
	public ApiController(TagTrendRepository tagTrendRepository) {
		this.tagTrendRepository = tagTrendRepository;
	}
	
	
	
	// Tag 트랜드
	@PostMapping("/Tag")
	public ResponseEntity<?> read(@RequestBody List<Map<String, String>> map) {
		log.info("Request [POST/api/Tag]");
//		System.out.println(map.get(0).get("label"));
		System.out.println(map);
		if (Integer.parseInt((String) map.get(0).get("index")) == 0) {
			System.out.println("10초");
			return ResponseEntity.status(HttpStatus.OK).body(tagTrendRepository.findTag(map));
		} else {
			System.out.println("10초 이상");
			return ResponseEntity.status(HttpStatus.OK).body(tagTrendRepository.findTagTime(map));
		}

	}

	// Tag 트랜드 - history
	@PostMapping("/history")
	public ResponseEntity<?> read(@RequestBody Map<String, Object> map) {
		System.out.println("히스토리 컨트롤러 진입");
		log.info("Request [POST/api/history]");
		System.out.println(map);
		List<Map<String, String>> result = tagTrendRepository.findHistory(map);
		System.out.println("히스토리 컨트롤러 성공");
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}



}