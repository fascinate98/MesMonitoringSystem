package com.example.demo.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Setter
@Getter
public class PressVo {
	private int pressLogId;
	private int pressLogPressId;
	private String pressLogTime;
	private int pressLogStatus;
	private int pressLogPunch;
}
