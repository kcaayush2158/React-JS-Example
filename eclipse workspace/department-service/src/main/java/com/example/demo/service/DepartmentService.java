package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Department;
import com.example.demo.repository.DepartmentRepository;

@Service
public class DepartmentService {
	
	
	@Autowired
	private DepartmentRepository departmentRepository;
	
	
	public Department saveDepartment(Department department) {
		return departmentRepository.save(department);
	}

	
	public Department findByDepartmentId(Long id) {
		// TODO Auto-generated method stub
		return departmentRepository.findByDepartmentId(id);
	}
	
	
	

}
