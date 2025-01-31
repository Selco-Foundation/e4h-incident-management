package com.readexcel.demo.entity;

import java.math.BigDecimal;
import java.util.List;

import com.readexcel.demo.entity.jurisdiction.Jurisdictions;

public class Employees {
	private String tenantId;
	private String employeeStatus;
	private BigDecimal dateOfAppointment;
	private String employeeType;
	private User user;
	private String code;
	private List<Jurisdictions> jurisdictions;
	private List<Assignments>assignments;
	private List<ServiceHistory> serviceHistory;
	private List<Education> education;
	private List<Tests> tests;
	public String getTenantId() {
		return tenantId;
	}
	public void setTenantId(String tenantId) {
		this.tenantId = tenantId;
	}
	public String getEmployeeStatus() {
		return employeeStatus;
	}
	public void setEmployeeStatus(String employeeStatus) {
		this.employeeStatus = employeeStatus;
	}
	public BigDecimal getDateOfAppointment() {
		return dateOfAppointment;
	}
	public void setDateOfAppointment(BigDecimal dateOfAppointment) {
		this.dateOfAppointment = dateOfAppointment;
	}
	public String getEmployeeType() {
		return employeeType;
	}
	public void setEmployeeType(String employeeType) {
		this.employeeType = employeeType;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public List<Jurisdictions> getJurisdictions() {
		return jurisdictions;
	}
	public void setJurisdictions(List<Jurisdictions> jurisdictions) {
		this.jurisdictions = jurisdictions;
	}
	public List<Assignments> getAssignments() {
		return assignments;
	}
	public void setAssignments(List<Assignments> assignments) {
		this.assignments = assignments;
	}
	public List<ServiceHistory> getServiceHistory() {
		return serviceHistory;
	}
	public void setServiceHistory(List<ServiceHistory> serviceHistory) {
		this.serviceHistory = serviceHistory;
	}
	public List<Education> getEducation() {
		return education;
	}
	public void setEducation(List<Education> education) {
		this.education = education;
	}
	public List<Tests> getTests() {
		return tests;
	}
	public void setTests(List<Tests> tests) {
		this.tests = tests;
	}
	
	
	
	
	
	

}
