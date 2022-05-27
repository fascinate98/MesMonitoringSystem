package com.example.demo.controller;

// 앱 api
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.JsonResult;
import com.example.demo.repository.ArduinoRepository;
import com.example.demo.repository.PerformanceRepository;
import com.example.demo.repository.PlanRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.PerformanceService;
import com.example.demo.vo.ArduinoVo;
import com.example.demo.vo.JoborderResultVo;
import com.example.demo.vo.JoborderVo;
import com.example.demo.vo.SlitterVo;
import com.example.demo.vo.UserVo;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@CrossOrigin
@RestController
@RequestMapping("/api")
public class ApiController {
	
	
	private final PlanRepository planRepository;
	private final PerformanceService performanceService;
	private final PerformanceRepository performanceRepository;
	private final UserRepository userRepository;
	private final ArduinoRepository arduinoRepository;
	
	public ApiController (PlanRepository planRepository, PerformanceService performanceService,
						PerformanceRepository performanceRepository, UserRepository userRepository,
						ArduinoRepository arduinoRepository) {
		this.performanceRepository = performanceRepository;
		this.performanceService = performanceService;
		this.planRepository = planRepository;
		this.userRepository = userRepository;
		this.arduinoRepository = arduinoRepository;
	}
	// 로그인
	@PostMapping("/login")
	public ResponseEntity<JsonResult> login(@RequestBody UserVo vo) {
		System.out.println(vo);
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(userRepository.findByEmailAndPassword(vo)));
	}
	
	// 생산 계획 조회
	@GetMapping("/plan")
	public ResponseEntity<JsonResult> readPlan(JoborderVo joborderVo,
			@RequestParam(value = "kw", required = true, defaultValue = "") String keyword) {
		log.info("Request [GET /api/plan]");
		System.out.println("들어가이시키");
//		System.out.println("-----controller-----");
//		System.out.println(joborderVo);
//		System.out.println("-----controller-----");

		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(planRepository.findPlan(keyword)));

	}
	// 슬리터
	
	   @GetMapping("/getslitter")
	   public ResponseEntity<JsonResult> getSlitter(SlitterVo slitterVo) {
	      // log.info("Request [GET /api/plan]");

	      System.out.println("-----controller-----");
	      System.out.println(slitterVo);
	      System.out.println("-----controller-----");

	      return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(planRepository.getSlitter(slitterVo)));

	      // restapi 변경
	      // if( ){
	      // ResponseEntity.ok().body()
	      // }else{
	      // ResponseEntity.badRequest().body()
	      // }

	   }
	// 앱 통신
	@GetMapping("/performance/{joborderJobname}")
	public ResponseEntity<JsonResult> appRead(@PathVariable("joborderJobname") String joborderJobname) {
		log.info("Request [GET//performance addRead]");
		System.out.println("-----controller-----");
		System.out.println(joborderJobname);
		System.out.println("-----controller-----");

		return ResponseEntity.status(HttpStatus.OK)
				.body(JsonResult.success(performanceRepository.conPerformance(joborderJobname)));
	}

	// 앱 생산실적 시작
	@PostMapping("/performance")
	public ResponseEntity<JsonResult> appInsert(@RequestBody JoborderResultVo joborderResultVo) {
		System.out.println("-----controller-----");
		System.out.println(joborderResultVo);
		System.out.println("-----controller-----");

		return ResponseEntity.status(HttpStatus.OK)
				.body(JsonResult.success(performanceService.insertPerformance(joborderResultVo)));
	}

	// 앱 생산실적 마무리
	@PutMapping("/performance")
	public ResponseEntity<JsonResult> appUpdate(@RequestBody JoborderResultVo joborderResultVo) {

		System.out.println("-----controller-----");
		System.out.println(joborderResultVo);
		System.out.println("-----controller-----");

		return ResponseEntity.status(HttpStatus.OK)
				.body(JsonResult.success(performanceService.updatePerformance(joborderResultVo)));
	}
	
	   @GetMapping("/arduino")
	   public ResponseEntity<JsonResult> readData() {
	      return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(arduinoRepository.findall()));

	   }

	   @PostMapping("/arduino")
	   public ResponseEntity<JsonResult> insert(@RequestBody ArduinoVo arduinoVo) {
	      return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(arduinoRepository.insert(arduinoVo)));

	   }

}