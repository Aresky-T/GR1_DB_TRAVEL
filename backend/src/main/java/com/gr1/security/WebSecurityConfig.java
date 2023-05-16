package com.gr1.security;

import com.gr1.jwt.JwtAuthenticationProvider;
import com.gr1.jwt.JwtTokenFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.access.channel.ChannelProcessingFilter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private JwtTokenFilter jwtTokenFilter;
    @Autowired
    private WebCorsFilter webCorsFilter;
    @Autowired
    private JwtAuthenticationProvider jwtAuthenticationProvider;
    @Autowired
    private AuthenticationEntryPointHandler authenticationEntryPointHandler;

    private static final String[] AUTH_WHITELIST = {
            // for Swagger UI v2
            "/v2/api-docs",
            "/swagger-ui.html",
            "/swagger-resources",
            "/swagger-resources/**",
            "/configuration/ui",
            "/configuration/security",
            "/webjars/**",

            // for Swagger UI v3 (OpenAPI)
            "/v3/api-docs/**",
            "/swagger-ui/**"
    };

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(jwtAuthenticationProvider);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers("/api/v1/auth/**").permitAll()
                .antMatchers(AUTH_WHITELIST).permitAll()
                .antMatchers("/api/v1/profile/**").hasAnyAuthority("ADMIN", "USER")
                .antMatchers(HttpMethod.PUT, "/api/v1/account/update-password").hasAnyAuthority("ADMIN", "USER")
                .antMatchers(HttpMethod.POST, "/api/v1/account/forgot-password").permitAll()
                .antMatchers("/api/v1/account/**").hasAuthority("ADMIN")
                .antMatchers("/api/v1/tour_guide/**").hasAuthority("ADMIN")
                .anyRequest().authenticated()
                .and()
                .httpBasic()
                .and()
                .cors()
                .and()
                .csrf().disable()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(authenticationEntryPointHandler)
                .and()
                .addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(webCorsFilter, ChannelProcessingFilter.class)
        ;
    }
}
