package com.example.demo.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import org.hibernate.annotations.GenericGenerator;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = "userId")})
public class UserEntity {
	@Id
	@GeneratedValue(generator="system-uuid")
	@GenericGenerator(name="system-uuid", strategy = "uuid")
	private Integer userId; // 유저에게 고유하게 부여되는 id.

	@Column(nullable = false)
	private String userName; // 유저의 이름
	
	@Column(nullable = false)
	private String userWorktype;
	
	@Column(nullable = false)
	private String userGroup;

	@Column(nullable = false)
	private String userPw; // 패스워드. null이 가능한 이유는 oAuth로 페이스북이나 트위터같은 제3의 어플리케이션을 통해 로그인 할 수 있게 하기 위함이다.
}