package com.hs.heatmap.controller;
import com.hs.heatmap.config.JwtTokenUtil;

import com.hs.heatmap.model.Account;
import com.hs.heatmap.model.ApiResponse;
import com.hs.heatmap.model.AuthToken;
import com.hs.heatmap.model.LoginUser;
import com.hs.heatmap.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/token")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private AccountService accountService;

    @RequestMapping(value = "/generate-token", method = RequestMethod.POST)
    public ApiResponse<AuthToken> register(@RequestBody LoginUser loginUser) throws AuthenticationException {
        System.out.println(loginUser.getUsername());
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginUser.getUsername(), loginUser.getPassword()));
        final Account account = accountService.getOne(loginUser.getUsername());
        System.out.println(account.getUsername());
        final String token = jwtTokenUtil.generateToken(account);
        return new ApiResponse<>(200, "success",new AuthToken(token, account.getUsername()));
    }

}
