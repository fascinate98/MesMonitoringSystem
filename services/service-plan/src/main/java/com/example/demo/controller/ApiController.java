package com.example.demo.controller;

import java.io.IOException;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.repository.PlanRepository;
import com.example.demo.service.GCSService;
import com.example.demo.service.PlanService;
import com.example.demo.vo.JoborderVo;
import com.google.cloud.storage.BlobInfo;
import com.google.zxing.WriterException;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@CrossOrigin
@RestController
@RequestMapping("/api")
public class ApiController {

	private final PlanRepository planRepository;
	private final PlanService planService ;
	
	
    private final GCSService gcsService;
    
    
	public ApiController(PlanRepository planRepository, PlanService planService,
			 GCSService gcsService) {
		this.planRepository = planRepository;
		this.planService = planService;
		this.gcsService = gcsService;
	}


	// 생산 계획 조회
	@GetMapping("/plan")
	public ResponseEntity<?> readPlan(JoborderVo joborderVo,
			@RequestParam(value = "kw", required = true, defaultValue = "") String keyword) {
		log.info("Request [GET /api/plan]");
		System.out.println("들어가이시키");
//		System.out.println("-----controller-----");
//		System.out.println(joborderVo);
//		System.out.println("-----controller-----");

		return ResponseEntity.status(HttpStatus.OK).body(planRepository.findPlan(keyword));

	}
	// 생산 계획 조회 디테일
	@PostMapping("/plan")
	public ResponseEntity<?> findPlanByJoborderId(@RequestBody Map<String, String> map) {
		log.info("Request [POST /api/plan]");
//      System.out.println("-----controller-----");
//      System.out.println(joborderVo);
//      System.out.println("-----controller-----");
	System.out.println(map);
		return ResponseEntity.status(HttpStatus.OK).body(planRepository.findPlanByJoborderId(map.get("joborderId")));

	}
	// 생산계획 등록
	@PostMapping("/registration")
	public ResponseEntity<?> insert(@RequestBody JoborderVo joborderVo) {
		log.info("Request [POST/api/registration]");
		System.out.println(joborderVo.toString());

		System.out.println("-----------insert controller------------");
		System.out.println(joborderVo);
		System.out.println("-----------insert controller------------");
		// System.out.println(JsonResult.success(planRepository.insertPlan(joborderVo)));

		return ResponseEntity.status(HttpStatus.OK).body(planService.insertPlan(joborderVo));
		// System.out.println(JsonResult.success(planRepository.insertPlan(joborderVo)));

	}
	
	@GetMapping("/qr")
	public ResponseEntity<?> localUploadToStorage () throws IOException, WriterException {
//		BlobInfo  fileFromGCS = gcsService.uploadFileToGCS();
//        return ResponseEntity.ok(fileFromGCS.toString());
		
		BlobInfo fileFromGCS = gcsService.uploadFileToGCS();
		return  ResponseEntity.status(HttpStatus.OK).body(fileFromGCS);
	}
//	@GetMapping("/qr")
//	public String makeQr() throws WriterException, IOException {
//		log.info("Request [GET// api/qr ]");
//
//		String savePath = "C:\\qr\\"; // 파일 경로
//
//		// 파일 경로가 없으면 생성하기
//		File file = new File(savePath);
//		if (!file.exists()) {
//			file.mkdirs();
//		}
//
//		// 링크로 할 URL주소
//		String url = planRepository.makeQR();
//		System.out.println(url);
//
//		// 링크 생성값
//		String codeurl = new String(url.getBytes("UTF-8"), "ISO-8859-1");
//
//		// QRCode 색상값
//		int qrcodeColor = 0xFF2e4e96;
//		// QRCode 배경색상값
//		int backgroundColor = 0xFFFFFFFF;
//
//		// QRCode 생성
//		QRCodeWriter qrCodeWriter = new QRCodeWriter();
//		BitMatrix bitMatrix = qrCodeWriter.encode(codeurl, BarcodeFormat.QR_CODE, 200, 200); // 200,200은 width, height
//
//		MatrixToImageConfig matrixToImageConfig = new MatrixToImageConfig(qrcodeColor, backgroundColor);
//		BufferedImage bufferedImage = MatrixToImageWriter.toBufferedImage(bitMatrix, matrixToImageConfig);
//
//		// 파일 이름에 저장한 날짜를 포함해주기 위해 date생성
//		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
//		String fileName = "C1040_" + sdf.format(new Date());
//
//		// 파일 경로, 파일 이름 , 파일 확장자에 맡는 파일 생성
//		File temp = new File(savePath + fileName + ".png");
//
//		// ImageIO를 사용하여 파일쓰기
//		ImageIO.write(bufferedImage, "png", temp);
//
//		// 리턴은 사용자가 원하는 값을 리턴한다.
//		// 작성자는 QRCode 파일의 이름을 넘겨주고 싶었음.
//		return fileName + ".png";
//	}


}