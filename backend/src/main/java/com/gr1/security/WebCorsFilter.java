package com.gr1.security;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;

@Component
public class WebCorsFilter implements Filter{

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // Khởi tạo filter
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        final HttpServletResponse hResponse = (HttpServletResponse) response;
        final HttpServletRequest  hRequest = (HttpServletRequest) request;
        hResponse.setHeader("Access-Control-Allow-Origin", "*");
        hResponse.setHeader("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS, DELETE");
        hResponse.setHeader("Access-Control-Max-Age", "3600");
        hResponse.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Key, Authorization");
        if ("OPTIONS".equalsIgnoreCase(hRequest.getMethod())) {
            hResponse.setStatus(HttpServletResponse.SC_OK);
        } else {
            chain.doFilter(request, response);
        }
    }

    @Override
    public void destroy() {
        // Hủy filter
    }
    
}
