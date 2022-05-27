package com.example.demo.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class ArduinoVo {
   private Integer arduinoId; // 생산이상 id
   private Double arduinoTemp; // 생산이상 설비번호
   private Double arduinoHumid;// 생산이상 발생 일시
   private Double arduinoDist;// 생산이상 발생 일시

}