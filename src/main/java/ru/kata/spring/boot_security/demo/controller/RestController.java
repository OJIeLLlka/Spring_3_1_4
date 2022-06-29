package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;
import java.util.List;

@org.springframework.web.bind.annotation.RestController
@RequestMapping("/api")
public class RestController {

    private final UserService userService;

    @Autowired
    public RestController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public List<User> showAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/users/{id}")
    public User showUserWithId(@PathVariable long id) {
        return userService.getUserById(id);
    }

    @PostMapping("/users")
    public List<User> addNewUser(@RequestBody User user) {
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        userService.saveUser(user);
        return userService.getAllUsers();
    }

    @PutMapping("/users")
    public List<User> updateUser(@RequestBody User user) {
        userService.updateUser(user);

        return userService.getAllUsers();
    }

    @DeleteMapping("/users/{id}")
    public List<User> deleteUserById(@PathVariable long id) {
        userService.removeUserById(id);
        return userService.getAllUsers();
    }

    @GetMapping("/users/principal")
    public User getPrincipalInfo(Principal principal) {
        return userService.findByUsername(principal.getName());
    }
}
