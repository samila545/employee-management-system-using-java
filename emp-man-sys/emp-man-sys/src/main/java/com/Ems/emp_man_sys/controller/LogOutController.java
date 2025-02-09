package com.Ems.emp_man_sys.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@RestController
public class LogOutController {

    @PostMapping("/logout")
    public void logout(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession(false);
        System.out.println("i am here");
        if (session != null) {
            session.invalidate(); // Destroy session
        }
        response.setStatus(HttpServletResponse.SC_OK); // Send success response
    }
}
