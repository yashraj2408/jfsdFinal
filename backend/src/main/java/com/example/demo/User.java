package com.example.demo;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "s13user")
public class User {
  
  private String name;
  private int role; // 1 = Admin, 2 = User, 0 = Guest
  @Id
  private String email;
  private String password;

  public User() {
  }

  public User(String name, int role, String email, String password) {
    this.name = name;
    this.role = role;
    this.email = email;
    this.password = password;
  }
  
  public String getName() {
    return name;
  }
  public void setName(String name) {
    this.name = name;
  }
  public int getRole() {
    return role;
  }
  public void setRole(int role) {
    this.role = role;
  }
  public String getEmail() {
    return email;
  }
  public void setEmail(String email) {
    this.email = email;
  }
  public String getPassword() {
    return password;
  }
  public void setPassword(String password) {
    this.password = password;
  }
  
  @Override
  public String toString() {
    return "User [name=" + name + ", role=" + role + ", email=" + email + ", password=" + password + "]";
  }
}
