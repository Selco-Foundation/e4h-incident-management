package com.readexcel.demo.entity.jurisdiction;

import java.util.List;

public class Jurisdictions {
	
	private String hierarchy;
	private List<Roles> roles;
	private String boundaryType;
	private String boundary;
	private String furnishedRolesList;
	private String tenantId;
	public String getHierarchy() {
		return hierarchy;
	}
	public void setHierarchy(String hierarchy) {
		this.hierarchy = hierarchy;
	}
	public List<Roles> getRoles() {
		return roles;
	}
	public void setRoles(List<Roles> roles) {
		this.roles = roles;
	}
	public String getBoundaryType() {
		return boundaryType;
	}
	public void setBoundaryType(String boundaryType) {
		this.boundaryType = boundaryType;
	}
	public String getBoundary() {
		return boundary;
	}
	public void setBoundary(String boundary) {
		this.boundary = boundary;
	}
	public String getFurnishedRolesList() {
		return furnishedRolesList;
	}
	public void setFurnishedRolesList(String furnishedRolesList) {
		this.furnishedRolesList = furnishedRolesList;
	}
	public String getTenantId() {
		return tenantId;
	}
	public void setTenantId(String tenantId) {
		this.tenantId = tenantId;
	}
	
	
	
	
	
}
