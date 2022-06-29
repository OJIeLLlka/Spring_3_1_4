package ru.kata.spring.boot_security.demo.configs;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MvcConfig implements WebMvcConfigurer {
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/admin").setViewName("new_admin");
        registry.addRedirectViewController("/", "/login");
        registry.addViewController("/api/users").setViewName("new_admin");
        registry.addViewController("/user").setViewName("role_user");
    }
}
