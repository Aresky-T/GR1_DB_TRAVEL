package com.gr1.controller;

import com.gr1.dtos.request.LoginForm;
import com.gr1.dtos.request.SignUpForm;
import com.gr1.dtos.response.JwtResponse;
import com.gr1.dtos.response.MessageResponse;
import com.gr1.entity.Account;
import com.gr1.entity.ERole;
import com.gr1.entity.EStatus;
import com.gr1.exception.CustomException;
import com.gr1.jwt.JwtUtil;
import com.gr1.security.CustomUserDetailsService;
import com.gr1.service.IAccountService;
import com.gr1.service.IProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private IAccountService accountService;
    @Autowired
    private IProfileService profileService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @PostMapping("/signup")
    public ResponseEntity<?> signUpUser(@RequestBody SignUpForm form) {
        if(accountService.existsByUsername(form.getUsername())){
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Username already exists"));
        }

        if (accountService.existsByEmail(form.getEmail())){
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email already exists"));
        }

        Account account = new Account();
        account.setUsername(form.getUsername());
        account.setPassword(passwordEncoder.encode(form.getPassword()));
        account.setEmail(form.getEmail());
        account.setStatus(EStatus.ACTIVE);
        account.setRole(ERole.USER);
        Account accountResponse = accountService.saveOrUpdate(account);
        profileService.addProfile(accountResponse);
        return new ResponseEntity<>("Sign up success", HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginForm form) {
        String username = form.getUsername();
        String password = form.getPassword();

        UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);
        Account account = accountService.findByUsername(username);

        if (!passwordEncoder.matches(password, userDetails.getPassword())){
            throw new BadCredentialsException("Mật khẩu không đúng, hãy kiểm tra lại!");
        }

        if(account.getStatus().equals(EStatus.BLOCKED)){
            throw new CustomException("Tài khoản của bạn đã bị khóa, không thể đăng nhập!");
        }

        UsernamePasswordAuthenticationToken authenticationToken = 
            new UsernamePasswordAuthenticationToken(username, password, userDetails.getAuthorities());
        authenticationManager.authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        String token = jwtUtil.generateToken(username);
        return ResponseEntity.ok(new JwtResponse(
                account.getId(),
                token,
                account.getUsername(),
                account.getEmail(),
                account.getRole().toString(),
                account.getStatus().toString()
        ));
    }

    @GetMapping("/validate-token")
    public ResponseEntity<Boolean> validateToken(@RequestParam String token){
        boolean isValid = accountService.validateJwt(token);
        return ResponseEntity.ok(isValid);
    }

    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER', 'EMPLOYEE')")
    @GetMapping("/validate-account")
    public ResponseEntity<Boolean> validateAccount(Authentication authentication){
        String username = authentication.getName();
        Account account = accountService.findByUsername(username);
        if(account.getStatus().equals(EStatus.BLOCKED)){
            return ResponseEntity.ok(false);
        }
        return ResponseEntity.ok(true);
    }
}
