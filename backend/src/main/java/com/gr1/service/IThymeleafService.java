package com.gr1.service;

import java.util.Map;

public interface IThymeleafService {
    String createContent(String template, Map<String, Object> variables);
}
