package ru.kata.spring.boot_security.demo.controller;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import ru.kata.spring.boot_security.demo.model.User;

@Controller
public class UserController {

    @GetMapping("/user")
    public String index(Model model) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        model.addAttribute("id", user.getId());
        model.addAttribute("username", user.getUsername());
        model.addAttribute("age", user.getAge());
        model.addAttribute("email", user.getEmail());
        model.addAttribute("roles", user.getRoles());
        return "user";
    }
}
