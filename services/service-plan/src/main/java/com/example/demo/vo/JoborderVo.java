package com.example.demo.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class JoborderVo {
   private Integer joborderId;
   private Integer joborderMaterialId; // 원자재
   private Integer joborderWriter;
   private Integer joborderSlitterNo; // 설비번호
   private Integer joborderWarehouseId;// 창고
   private String joborderJobname; // 작업명
   private Integer joborderWeight; // 생산 중량
   private Integer joborderWidth; // 폭
   private Integer joborderStatus; // 폭

   private Integer joborderLine; // 줄 수
   private String joborderRegDate;
   private String joborderEndDate; // 납기일
   private Integer joborderEstTime; // 예상시간
   private String joborderWorkplace; // 사업장
   private String joborderCustomer; // 고객사
   private Integer joborderWorkerNum; // 작업 인원
   private Integer joborderEmg; // 긴급 or 낫 긴급
   private String joborderQr; // qr코드
   private String joborderWorkerName; // 작업자
   private String joborderWriterName;

   
   private String userName; // 이름
   private String slitterName; // 슬리터명
   private String materialProdName; // 원자재명
   private Integer materialWidth; // 투입재폭
   private String materialLotno;
}