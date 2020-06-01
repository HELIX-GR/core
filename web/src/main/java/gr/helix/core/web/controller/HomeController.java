package gr.helix.core.web.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

    private static final String clientRoutes[] = {
        "/collections/",
        "/datasets/",
        "/error/",
        "/favorites/",
        "/main/",
        "/news/",
        "/notebooks/",
        "/pages/",
        "/profile/",
        "/project/",
        "/the-action/",
        "/network/",
        "/applications/",
        "/news-events/",
    };

    @RequestMapping("*")
    public String index(HttpSession session, HttpServletRequest request) {
        // Prevent infinite redirects
        if (this.isClientRoute(request.getServletPath())) {
            return "index";
        }
        return "redirect:/main/";
    }

    @RequestMapping({
        "/collections/**",
        "/datasets/**",
        "/error/**",
        "/favorites/**",
        "/main/**",
        "/news/**",
        "/notebooks/**",
        "/pages/**",
        "/profile/**",
        "/project/**",
        "/the-action/**",
        "/network/**",
        "/applications/**",
        "/news-events/**",
    })
    public String reactRoutes(HttpSession session, HttpServletRequest request) {
        return "index";
    }

    private boolean isClientRoute(String path) {
        for (final String value : clientRoutes) {
            if (path.toLowerCase().startsWith(value)) {
                return true;
            }
        }
        return false;
    }

}
