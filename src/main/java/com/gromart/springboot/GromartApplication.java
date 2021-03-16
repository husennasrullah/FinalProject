package com.gromart.springboot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages={"com.gromart.springboot"})
public class GromartApplication {
    public static void main(String[] args) {
        SpringApplication.run(GromartApplication.class, args);
    }
}

