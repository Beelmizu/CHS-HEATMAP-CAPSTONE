package com.hs.heatmap.controller;

import com.hs.heatmap.model.Account;
import com.hs.heatmap.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins="*")
public class AccountController {

    @Autowired
    AccountService accountService;

    @GetMapping("/account/getAll")
    public List<Account> getAllAccounts(){ return accountService.getAllAccount(); }

    @GetMapping("/account/getAccountByCompany/{id}")
    public List<Account> getAccountByCompany(@PathVariable(value = "id") int id){ return accountService.getAccountByCompany(id); }

    @GetMapping("/account/getAccountByStore/{id}")
    public List<Account> getAccountByStore(@PathVariable(value = "id") int id){ return accountService.getAccountByCompany(id); }

    @GetMapping("account/getDetail/{id}")
    public Account getDetailAccount(@PathVariable(value = "id") int id){ return accountService.getDetailAccount(id); }

    @GetMapping("account/getIDByUsername/{username}")
    public Integer getIDByUsername(@PathVariable(value = "username") String username){ return accountService.getIDByUsername(username); }

    @GetMapping("/account/search/{searchValue}")
    public List<Account> searchAccount(@PathVariable(value = "searchValue") String searchValue) { return accountService.getAccountsByUsername(searchValue); }

    @PostMapping("/account/inactive")
    public boolean inactiveAccount(@RequestBody Account account) { return accountService.inactiveAccount(account); }

    @PostMapping("/account/active")
    public boolean activeAccount(@RequestBody Account account) { return accountService.activeAccount(account); }

    @PostMapping("/account/update")
    public boolean updateAccount(@RequestBody Account account) {
        return accountService.updateAccount(account);
    }

    @PostMapping("/account/create")
    public boolean createAccount(@RequestBody Account account) {
        return accountService.createNewAccount(account);
    }
}
