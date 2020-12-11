package com.application.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixProperty;

@RestController
public class FallbackMethodController {

	@GetMapping("userServiceFallBack")
	@HystrixCommand(fallbackMethod = "userServiceFallBack", commandProperties = {
			@HystrixProperty(name = "execution.isolation.thread.timeoutInMilliseconds", value = "4000") })
	public String userServiceFallBackMethod() {
		return "User Service is taking long as expected";

	}

	@HystrixCommand(fallbackMethod = "departmentServiceFallBack", commandProperties = {
			@HystrixProperty(name = "execution.isolation.thread.timeoutInMilliseconds", value = "4000") })
	@GetMapping("departmentServiceFallBack")
	public String departmentServiceFallBackMethod() {
		return "Department  Service is taking long as expected";

	}

}
