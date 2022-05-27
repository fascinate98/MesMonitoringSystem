package com.example.demo.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class IsAbnormalVo {
   private Integer isAbnormalId; // 생산이상 id
   private Integer isAbnormalPressId; // 생산이상 설비번호
   private String isAbnormalRegDate;// 생산이상 발생 일시
   private Integer isAbnormalStatus;// 생산이상 발생 일시

}