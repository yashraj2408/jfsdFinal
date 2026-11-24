package org.studyeasy.SpringStarter.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.studyeasy.SpringStarter.Model.Theme;
import org.studyeasy.SpringStarter.Model.User;
import org.studyeasy.SpringStarter.Repository.ThemeRepository;
import org.studyeasy.SpringStarter.Repository.UserRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ThemeRepository themeRepository;

    @Override
    public void run(String... args) throws Exception {
        // Seed default Admin if not exists
        if (userRepository.findByEmail("admin@gmail.com") == null) {
            User admin = new User("admin@gmail.com", "admin123", "admin", "System Administrator", "ADMIN");
            userRepository.save(admin);
            System.out.println("Default admin user created: admin@gmail.com / admin123");
        }

        if (userRepository.findByEmail("satyavenkat93881@gmail.com") == null) {
            User satya = new User("satyavenkat93881@gmail.com", "admin123", "satya", "Satya Venkat", "ADMIN");
            userRepository.save(satya);
        }

        // Seed default User if not exists
        if (userRepository.findByEmail("user@gmail.com") == null) {
            User user = new User("user@gmail.com", "user123", "demouser", "Demo Customer", "USER");
            user.setKitchenSize("Large");
            user.setWoodPreference("Oak");
            user.setFlooringType("Hardwood");
            user.setNumberOfBedrooms(3);
            user.setWallColor("Warm White");
            user.setOpenFloorPlan(true);
            user.setRemodelingBudget(25000.0);
            userRepository.save(user);
            System.out.println("Default customer user created: user@gmail.com / user123");
        }

        // Seed default Themes if none exist
        if (themeRepository.count() == 0) {
            saveTheme("Modern Armchair", "/images/furniture1.jpg");
            saveTheme("Minimalist Dining Table", "/images/furniture2.png");
            saveTheme("Luxury Sofa", "/images/furniture3.png");
            saveTheme("Coffee Table", "/images/furniture4.jpg");
            saveTheme("Modern Bookshelf", "/images/furniture5.jpg");
            saveTheme("Executive Desk", "/images/furniture6.jpg");
            System.out.println("Default themes initialized successfully.");
        }
    }

    private void saveTheme(String name, String imageUrl) {
        Theme theme = new Theme();
        theme.setName(name);
        theme.setImageUrl(imageUrl);
        themeRepository.save(theme);
    }
}
