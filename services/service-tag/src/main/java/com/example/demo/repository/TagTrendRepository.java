package com.example.demo.repository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.util.StopWatch;

import com.example.demo.vo.PressVo;

@Repository
public class TagTrendRepository {

	@Autowired
	private SqlSession sqlSession;

	public List<PressVo> findTag(List<Map<String, String>> seletItem) {
		System.out.println(seletItem);
		ArrayList<Integer> list = new ArrayList<Integer>();
		ArrayList<Integer> size = new ArrayList<>(Arrays.asList(0, 604800, 1209600, 1814400, 2419200, 3023999, 3628799,
				4233598, 4838397, 5443196, 6047996, 6652795, 7257594, 7862394, 8467194, 9071994, 9676794, 10281594,
				10886393, 11491193, 12095986, 12700779, 13305572, 13910365, 14515158, 15119951, 15724744)); 
		int time = Integer.parseInt(seletItem.get(0).get("index"));									
		for (Map<String, String> element : seletItem) {
			int index = Integer.parseInt(element.get("value")) - 1;
			for(int i = 1; i<=10; i++) {
				list.add(time + i + size.get(index));
			}
		}
		System.out.println(list);
		//
		// System.out.println(Integer.parseInt(map.get(0).get("startRow")));
		// List<TagVo> i= sqlSession.selectList("tag.findTag", new HashMap<String,
		// Object>() {{
		// put("equip_id", map.get(0).get("value"));
		// put("start_row", Integer.parseInt(map.get(0).get("startRow")));
		// }});

		List<PressVo> i = sqlSession.selectList("tag.findTagTime", new HashMap<String, Object>() {
			{
				put("list", list);
//				put("seletItem", seletItem);
//				put("index", seletItem.get(0).get("index"));
			}
		});
		System.out.println(i);
		return i;
	}

	// 태그 히스토리
	public List<Map<String, String>> findHistory(Map<String, Object> map) {

		ArrayList<Integer> list = new ArrayList<Integer>();
		// 1시간 id
		int Period = Integer.parseInt(((String) map.get("endDate")).split("-")[2])
				- Integer.parseInt(((String) map.get("startDate")).split("-")[2]);
		if (Period == 0) {
			for (int i = 0; i < 24; i++) {
				list.add((i * 3600) + 1); // 1시간씩
			}
		} else {
			for (int day = 0; day < Period; day++) {
				for (int i = 0; i < 24; i++) {
					list.add((i * 3600) + (day * 86400) + 1); // 1시간씩
				}
			}
		}

		// 선택

		// 설비 번호
		System.out.println(map.get("selectOptions").getClass().getName());
		ArrayList<Integer> id = new ArrayList<Integer>();
//	      for (int i = 0; i <  map.get("selectOptions"); i++) {
//	         id.add(i);
//	      }

		StopWatch stopWatch = new StopWatch();
		stopWatch.start();
		System.out.println(list);
		List<Map<String, String>> result = sqlSession.selectList("tag.findHistory", new HashMap<String, Object>() {
			{
				put("time", list);
				put("id", map.get("selectOptions"));
			}
		});
		System.out.println(id);
		stopWatch.stop();
		System.out.println("수행시간 >> {}" + stopWatch.getTotalTimeSeconds());
		System.out.println(result);
		return result;
	}

	// 실시간
	public List<PressVo> findTagTime(List<Map<String, String>> seletItem) {
		ArrayList<Integer> list = new ArrayList<Integer>();
		ArrayList<Integer> size = new ArrayList<>(Arrays.asList(0, 604800, 1209600, 1814400, 2419200, 3023999, 3628799,
				4233598, 4838397, 5443196, 6047996, 6652795, 7257594, 7862394, 8467194, 9071994, 9676794, 10281594,
				10886393, 11491193, 12095986, 12700779, 13305572, 13910365, 14515158, 15119951, 15724744)); // 24까지-db에는
																											// 23
		for (Map<String, String> element : seletItem) {
			int index = Integer.parseInt(element.get("value")) - 1;
			list.add(Integer.parseInt(seletItem.get(0).get("index")) + (size.get(index)));
		}
		System.out.println(list);

		List<PressVo> i = sqlSession.selectList("tag.findTagTime", new HashMap<String, Object>() {
			{
				put("list", list);
			}
		});

		return i;
	}

}