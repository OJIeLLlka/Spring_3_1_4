package ru.kata.spring.boot_security.demo.service;

import org.springframework.stereotype.Service;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.repository.dao.RoleRepository;

import java.util.HashSet;
import java.util.Set;

@Service
public class RoleService {

    private final RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public Set<Role> getSetRoles(Set<Role> roles) {
        Set<Role> setRoles = new HashSet<>();
        for (Role role : roles) {
            setRoles.add(roleRepository.getRoleByName(role.getName()));
        }
        return setRoles;
    }
}
