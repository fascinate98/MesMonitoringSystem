package com.example.demo.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Data
@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor	//	파라미터 없는 생성자 생성
@AllArgsConstructor	//	모든 필드에 대한 생성자 생성
public class UserVo {
	private String token;
	private Integer userId;
	private String userPw;
	private String userName;
	private String userWorktype;
	private String userGroup;
	
}