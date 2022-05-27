
package com.example.demo.exception;

import java.io.PrintWriter;
import java.io.StringWriter;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.dto.JsonResult;


/*
 * 모든 에러가 여기로 AOP기술
 * 
 * */
@ControllerAdvice
public class GlobalExceptionHandler {
	private static final Log LOGGER = LogFactory.getLog(GlobalExceptionHandler.class);
	
	@ExceptionHandler(Exception.class)
	@ResponseBody
	public ResponseEntity<JsonResult> ExceptionHandler(Exception e) throws Exception{
		
		
	//	1. 로깅
	StringWriter errors = new StringWriter();
	e.printStackTrace(new PrintWriter(errors)); 
	LOGGER.error(errors.toString());
	
	
	//	3. JSON 요청 
	return ResponseEntity.status(HttpStatus.OK).body(JsonResult.fail(errors.toString()));
		
	}
}

