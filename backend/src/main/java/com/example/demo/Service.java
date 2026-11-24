package com.example.demo;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
public class Service {
  
  @Autowired
  private DAO dao;

  @GetMapping("/")
  public String home() {
    return "FeedBack Management System Backend is Live!";
  }

  @GetMapping("/welcome/{name}")
  public String welcome(@PathVariable String name) {
    return "Welcome " + name;
  }
  
  @PostMapping("/user")
  public String insertUser(@RequestBody User user) {
    if (user == null || user.getEmail() == null || user.getEmail().trim().isEmpty()) {
      return "Error: Invalid user data";
    }
    user.setEmail(user.getEmail().trim());
    dao.insert(user);
    return "User inserted";
  }

  @GetMapping("/user")
  public String getUser(@RequestParam("email") String email) {
    User u = dao.findUser(email);
    return u != null ? u.toString() : "User not found";
  }
  
  @GetMapping("/all")
  public List<User> getAllUsers() {
    return dao.find();
  }
  
  @GetMapping("/page")
  public List<User> getPage(@RequestParam("page") int page, @RequestParam("limit") int limit) {
    return dao.findPage(page, limit);
  }
  
  @DeleteMapping("/delete")
  public String deleteUser(@RequestParam("email") String email) {
    return dao.deleteUser(email);
  }
  
  @PutMapping("/update")
  public String updateUser(@RequestBody User user) {
    return dao.editUser(user);
  }
  
  @PostMapping("/login")
  public User login(@RequestBody User user) {
    if (user == null || user.getEmail() == null || user.getPassword() == null) {
      System.out.println("Invalid login payload");
      return null;
    }

    String email = user.getEmail().trim();
    String password = user.getPassword().trim();

    User existing = dao.findUser(email);

    // Self-healing default accounts
    if (existing == null) {
      if (email.equalsIgnoreCase("admin@gmail.com") && password.equals("admin123")) {
        existing = new User("Administrator", 1, "admin@gmail.com", "admin123");
        dao.insert(existing);
      } else if (email.equalsIgnoreCase("user@gmail.com") && password.equals("user123")) {
        existing = new User("Demo User", 2, "user@gmail.com", "user123");
        dao.insert(existing);
      }
    }

    if (existing == null) {
      System.out.println("User not found: " + email);
      return null;
    }

    if (existing.getPassword() != null && existing.getPassword().trim().equals(password)) {
      System.out.println("Login success for: " + email + " (Role: " + existing.getRole() + ")");
      return existing;
    }

    System.out.println("Incorrect password for: " + email);
    return null;
  }
}
