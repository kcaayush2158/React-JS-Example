package com.application.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.application.model.Department;
import com.application.model.ResponseTemplateVo;
import com.application.model.User;
import com.application.repository.UserRepository;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private RestTemplate restTemplate;
	
	
	public User saveUser(User user) {
		return userRepository.save(user);
		
	}
	
	
	public ResponseTemplateVo getUserWithDepartment(Long id) {
		ResponseTemplateVo vo = new ResponseTemplateVo();
		User user  = userRepository.findUserById(id);
		System.out.print(user);
		
		Department department = restTemplate.getForObject("http://DEPARTMENT-SERVICE/departments/"+user.getDepartmentId(), Department.class);
		System.out.print(department);
		vo.setDepartment(department);
		vo.setUser(user);
		return vo;
	
	
	}
	

}
