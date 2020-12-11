package com.example.demo.controller;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Department;
import com.example.demo.service.DepartmentService;

import lombok.extern.slf4j.Slf4j;


@RestController
@RequestMapping("/departments")
@Slf4j
public class DepartmentController {
	
	Logger logger = LoggerFactory.getLogger(DepartmentController.class);
	
	@Autowired
	private DepartmentService departmentService;
	
	@PostMapping("/")
	public Department saveDepartment(@RequestBody Department department) {
		logger.info("The department has been saved");
		return departmentService.saveDepartment(department);
	}
	
	@GetMapping("/{id}")
	public Department findByDepartmentId(@PathVariable("id") Long id) {
		logger.info("department has been saved");
		return departmentService.findByDepartmentId(id);
		
	}
	
}
