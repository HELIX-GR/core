package gr.helix.core.web.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

    @RequestMapping("*")
    public String index(HttpSession session, HttpServletRequest request) {
        // Prevent infinite redirects
        if(request.getServletPath().equalsIgnoreCase("/core/")) {
            return "index";
        }
        return "redirect:/core/";
    }

    @RequestMapping("/core/**")
    public String main(HttpSession session, HttpServletRequest request) {
        // Handle all requests except for API calls
        return "index";
    }

}
