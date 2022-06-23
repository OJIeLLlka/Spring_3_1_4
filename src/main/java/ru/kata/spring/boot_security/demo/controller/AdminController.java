package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import javax.validation.Valid;
import java.util.*;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private final UserService userService;

    @Autowired
    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public String index(Model model) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userService.findByUsername(auth.getName());
        model.addAttribute("user", user);
        model.addAttribute("users", userService.getAllUsers());
        model.addAttribute("newUser", new User());
        return "new_admin";
    }

//    @GetMapping("/{id}")
//    public String show(@PathVariable("id") long id, Model model) {
//
//        model.addAttribute("user", userService.getUserById(id));
//        return "admin";
//    }

    @PostMapping
    public String create(@ModelAttribute("newUser") @Valid User user,
                         @RequestParam(value = "rolesId") String[] roles, BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            return "new_admin";
        }

        user.setRoles(Arrays.stream(roles).map(Role::new).collect(Collectors.toSet()));
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        userService.saveUser(user);
        return "redirect:/admin";
    }

    //РЕДАКТИРОВАНИЕ ЮЗЕРА
//    @GetMapping("/{id}/edit")
//    public String edit(@PathVariable("id") long id, Model model) {
//
//        model.addAttribute("user", userService.getUserById(id));
//        return "edit";
//    }

    @PostMapping("/{id}")
    public String update(@ModelAttribute("user") @Valid User user,
                         @RequestParam(value = "rolesId") String[] roles, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return "new_admin";
        }

        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        user.setRoles(Arrays.stream(roles).map(Role::new).collect(Collectors.toSet()));
        userService.updateUser(user);
        return "redirect:/admin";
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable("id") long id) {
        userService.removeUserById(id);
        return "redirect:/admin";
    }
}