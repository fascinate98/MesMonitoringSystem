package com.example.demo.repository;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.demo.vo.ArduinoVo;

@Repository
public class ArduinoRepository {

   @Autowired
   private SqlSession sqlSession;

   public ArduinoVo findall() {
      //System.out.println("[아두이노]");
      return sqlSession.selectOne("arduino.findall");
   }
   public Boolean insert(ArduinoVo arduinoVo) {
      return sqlSession.insert("arduino.insert", arduinoVo) == 1;
   }

}