package com.example.demo.service;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;

import javax.imageio.ImageIO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.repository.PlanRepository;
import com.google.cloud.storage.Acl;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageConfig;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GCSService {
	@Autowired
	private PlanRepository planRepository;
	
	@Autowired
	private final Storage storage;


	 @SuppressWarnings("deprecation")
	    public BlobInfo uploadFileToGCS() throws  IOException, WriterException{
		 	System.out.println("서비스단");
		 	String savePath = "\\qr\\"; // 파일 경로
		 
		 		// 파일 경로가 없으면 생성하기
		 	File file = new File(savePath);
		 	if (!file.exists()) {
		 		file.mkdirs();
		 	}
		 	
			// 링크로 할 URL주소
			String url = planRepository.makeQR();
			System.out.println(url);
			
			// 링크 생성값  
			String codeurl = new String(url.getBytes("UTF-8"), "ISO-8859-1");
	
			// QRCode 색상값
			int qrcodeColor = 0xFF2e4e96;
			// QRCode 배경색상값
			int backgroundColor = 0xFFFFFFFF;
	
			// QRCode 생성
			QRCodeWriter qrCodeWriter = new QRCodeWriter();
			BitMatrix bitMatrix = qrCodeWriter.encode(codeurl, BarcodeFormat.QR_CODE, 200, 200); // 200,200은 width, height
	
			MatrixToImageConfig matrixToImageConfig = new MatrixToImageConfig(qrcodeColor, backgroundColor);
			BufferedImage bufferedImage = MatrixToImageWriter.toBufferedImage(bitMatrix, matrixToImageConfig);
	
			// 파일 이름에 저장한 날짜를 포함해주기 위해 date생성
			SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
			String fileName = "C1040_" + sdf.format(new Date());
	
			// 파일 경로, 파일 이름 , 파일 확장자에 맡는 파일 생성
			File temp = new File(savePath + fileName + ".png");
	
			// ImageIO를 사용하여 파일쓰기
			ImageIO.write(bufferedImage, "png", temp);
	

			BlobInfo blobInfo = storage.create(
					BlobInfo.newBuilder("return0_qr", fileName+".png")
                     .setAcl(new ArrayList<>(Arrays.asList(Acl.of(Acl.User.ofAllAuthenticatedUsers(), Acl.Role.READER))))
                     .build(),
                     new FileInputStream(temp));
			
			Blob blob = storage.get("return0_qr", fileName+".png");
			blob.downloadTo(Paths.get(savePath));
			
			return blobInfo;
}

}
