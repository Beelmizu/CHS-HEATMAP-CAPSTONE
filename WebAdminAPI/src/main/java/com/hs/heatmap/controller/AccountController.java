package com.hs.heatmap.controller;

import com.hs.heatmap.model.Account;
import com.hs.heatmap.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins="http://localhost:4200")
public class AccountController {

    @Autowired
    AccountService accountService;

    @GetMapping("/accounts/getAll")
    public List<Account> getAllAccounts(){ return accountService.getAllAccount(); }

    @GetMapping("accounts/getDetail/{id}")
    public Account getDetailAccount(@PathVariable(value = "id") int id){ return accountService.getDetailAccount(id); }

    @GetMapping("/accounts/search/{searchValue}")
    public List<Account> searchAccount(@PathVariable(value = "searchValue") String searchValue) { return accountService.getAccountsByUsername(searchValue); }

    @DeleteMapping("/accounts/delete")
    public Account deleteAccountByID(@RequestBody Account account) { return accountService.deleteAccount(account); }

    @PostMapping("/accounts/update")
    public Account updateAccount(@RequestBody Account account) { return accountService.updateAccount(account); }

    @PostMapping("/accounts/create")
    public Account createAccount(@RequestBody Account account) { return accountService.createNewAccount(account); }

}
