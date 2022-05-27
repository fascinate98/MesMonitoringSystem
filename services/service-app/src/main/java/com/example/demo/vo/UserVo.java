package com.example.demo.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class UserVo {
	private String token;
	private Integer userId;
	private String userPw;
	private String userName;
	private String userWorktype;
	private String userGroup;
	
}