package com.krzykocz.shopserver.user;

import com.krzykocz.shopserver.auth.AuthToken;
import com.krzykocz.shopserver.auth.LoginUser;
import com.krzykocz.shopserver.config.JwtTokenUtil;
import com.krzykocz.shopserver.enums.UserRoleEnum;
import com.krzykocz.shopserver.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.naming.AuthenticationException;
import javax.validation.Valid;
import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @GetMapping("/user")
    public List<UserEntity> getAll() {
        return userRepository.findAll();
    }

    @GetMapping("/user/{userId}")
    public UserEntity getUserById(@PathVariable Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found for id :: " + userId));
    }

    @GetMapping("/user/role/{roleName}")
    public List<UserEntity> getAllByRole(@PathVariable String roleName) {
        return userRepository.findAllByRole(UserRoleEnum.valueOf(roleName));
    }

    @GetMapping("/user/current")
    public UserEntity getCurrentUser(Principal principal) {
        return userRepository.findByUsername(principal.getName());
    }

    @PostMapping("/user/auth")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginUser loginUser) throws AuthenticationException {
        final Authentication authentication = authenticationManager.authenticate((
                new UsernamePasswordAuthenticationToken(
                        loginUser.getUsername(),
                        loginUser.getPassword()
                )
        ));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        final UserEntity user = userRepository.findByUsername(loginUser.getUsername());
        final String token = jwtTokenUtil.generateToken(user);
        return ResponseEntity.ok(new AuthToken(token));
    }

    @PostMapping("/user/create")
    public ResponseEntity<?> createUser(@RequestBody UserEntity user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            return new ResponseEntity<>("Username is already taken!", HttpStatus.BAD_REQUEST);
        }
        if (userRepository.existsByEmail(user.getEmail())) {
            return new ResponseEntity<>("Email is already in use!", HttpStatus.BAD_REQUEST);
        }

        UserEntity newUser = new UserEntity();

        newUser.setUsername(user.getUsername());
        newUser.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        newUser.setEmail(user.getEmail());
        newUser.setFirstname(user.getFirstname());
        newUser.setLastname(user.getLastname());
        newUser.setRole(UserRoleEnum.CUSTOMER);
        newUser.setCity(user.getCity());
        newUser.setVoivodeship(user.getVoivodeship());
        newUser.setPostalCode(user.getPostalCode());
        newUser.setStreet(user.getStreet());
        newUser.setHouseNr(user.getHouseNr());
        newUser.setPhone(user.getPhone());

        return new ResponseEntity<>(userRepository.saveAndFlush(newUser), HttpStatus.CREATED);
    }


    @PutMapping({"/user/current", "/user/{id}"})
    public ResponseEntity<?> updateUser(@RequestBody UserEntity userUpdate, @PathVariable Optional<Long> id, Principal principal) {
        try {
            UserEntity user;
            if (id.isPresent()) {
                user = userRepository.findById(id.get()).orElseThrow(() -> new ResourceNotFoundException("User not found!"));
                user.setRole(userUpdate.getRole());
            } else {
                user = userRepository.findByUsername(principal.getName());
            }

            user.setEmail(userUpdate.getEmail());
            user.setFirstname(userUpdate.getFirstname());
            user.setLastname(userUpdate.getLastname());
            user.setCity(userUpdate.getCity());
            user.setVoivodeship(userUpdate.getVoivodeship());
            user.setPostalCode(userUpdate.getPostalCode());
            user.setStreet(userUpdate.getStreet());
            user.setHouseNr(userUpdate.getHouseNr());
            user.setPhone(userUpdate.getPhone());

            return ResponseEntity.status(HttpStatus.OK).body(userRepository.save(user));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }
}
