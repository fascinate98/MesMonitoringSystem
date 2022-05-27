package com.example.demo.repository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class MonitoringRepository {
	@Autowired
	private SqlSession sqlsession;
	
	public List<Map<String, Object>> findAll(Map<String, String> index){
		
		ArrayList<Integer> list = new ArrayList<Integer>();
		ArrayList<Integer> size= new ArrayList<>(Arrays.asList(0, 604800, 1209600, 1814400, 2419200, 3023999, 3628799, 4233598, 4838397, 5443196
															, 6047996, 6652795, 7257594, 7862394, 8467194, 9071994, 9676794, 10281594, 10886393, 11491193
															, 12095986, 12700779, 13305572, 13910365, 14515158, 15119951, 15724744));	//	24까지-db에는 23
		for (int i = 0; i<27; i++) {
			list.add(Integer.parseInt(index.get("index")) + (size.get(i)));
		}
		
		
		List<Map<String, Object>> i = sqlsession.selectList("press.findAll", new HashMap<String, Object>() {
			{
				put("index", index);
				put("list", list);
				
			}
		});
//		System.out.println("=======monitoring====");
//		System.out.println(i);
//		System.out.println("=======monitoring====");
		 return i;
	}
}
