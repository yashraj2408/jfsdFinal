package org.studyeasy.SpringStarter.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.studyeasy.SpringStarter.Model.Theme;
import org.studyeasy.SpringStarter.Model.User;
import org.studyeasy.SpringStarter.Repository.ThemeRepository;
import org.studyeasy.SpringStarter.Repository.UserRepository;
import org.studyeasy.SpringStarter.Request.LoginRequest;
import org.studyeasy.SpringStarter.Response.LoginResponse;
import org.studyeasy.SpringStarter.service.UserService;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ThemeRepository themeRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        String email = loginRequest.getEmail() != null ? loginRequest.getEmail().trim() : "";
        String password = loginRequest.getPassword() != null ? loginRequest.getPassword().trim() : "";

        System.out.println("Received login request for email: " + email);

        User user = userService.findByEmail(email);

        // Resilient fallback: ensure default admin accounts authenticate even before initial seed
        if (user == null) {
            if ((email.equalsIgnoreCase("admin@gmail.com") || email.equalsIgnoreCase("satyavenkat93881@gmail.com"))
                    && password.equals("admin123")) {
                user = new User(email.toLowerCase(), "admin123", "admin", "System Administrator", "ADMIN");
                userRepository.save(user);
                System.out.println("Auto-provisioned default admin: " + email);
            } else if (email.equalsIgnoreCase("user@gmail.com") && password.equals("user123")) {
                user = new User(email.toLowerCase(), "user123", "demouser", "Demo Customer", "USER");
                userRepository.save(user);
                System.out.println("Auto-provisioned default demo user: " + email);
            }
        }

        if (user == null) {
            System.out.println("No user found with email: " + email);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Error: No user found with this email. Please click Sign Up to register.");
        }

        if (!user.getPassword().equals(password)) {
            System.out.println("Incorrect password for email: " + email);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Error: Incorrect password for this email.");
        }

        System.out.println("Login successful for email: " + email + " (Role: " + user.getRole() + ")");
        return ResponseEntity.ok(new LoginResponse("Login successful", user.getRole()));
    }

    @GetMapping("/themes")
    @ResponseBody
    public List<Theme> getAllThemes() {
        return themeRepository.findAll();
    }

    @PostMapping("/add-theme")
    public ResponseEntity<String> addTheme(@RequestBody Theme theme) {
        if (theme.getName() == null || theme.getImageUrl() == null) {
            return ResponseEntity.badRequest().body("Theme name and image URL are required!");
        }
        themeRepository.save(theme);
        return ResponseEntity.ok("Theme added successfully!");
    }

    @PutMapping("/edit-theme/{id}")
    @ResponseBody
    public ResponseEntity<String> editTheme(@PathVariable Long id, @RequestBody Theme updatedTheme) {
        Optional<Theme> themeOptional = themeRepository.findById(id);
        if (themeOptional.isEmpty()) {
            return ResponseEntity.status(404).body("Theme not found");
        }

        Theme theme = themeOptional.get();
        theme.setName(updatedTheme.getName());
        theme.setImageUrl(updatedTheme.getImageUrl());
        themeRepository.save(theme);
        return ResponseEntity.ok("Theme updated successfully!");
    }

    @DeleteMapping("/themes/{id}")
    public ResponseEntity<String> deleteTheme(@PathVariable Long id) {
        if (!themeRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Theme not found");
        }
        themeRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
