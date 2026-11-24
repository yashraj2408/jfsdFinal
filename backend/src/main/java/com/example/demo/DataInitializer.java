package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private DAO dao;

    @Override
    public void run(String... args) throws Exception {
        // Seed default Admin if not exists
        if (dao.findUser("admin@gmail.com") == null) {
            dao.insert(new User("Administrator", 1, "admin@gmail.com", "admin123"));
            System.out.println("Default Admin seeded: admin@gmail.com / admin123 (Role: 1)");
        }

        // Seed default User if not exists
        if (dao.findUser("user@gmail.com") == null) {
            dao.insert(new User("Demo User", 2, "user@gmail.com", "user123"));
            System.out.println("Default User seeded: user@gmail.com / user123 (Role: 2)");
        }
    }
}
