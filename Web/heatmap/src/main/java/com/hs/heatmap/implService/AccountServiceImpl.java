package com.hs.heatmap.implService;

import com.hs.heatmap.model.Account;
import com.hs.heatmap.repository.AccountRepository;
import com.hs.heatmap.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public Integer getIDByUsername(String username) {
        return accountRepository.findByUsername(username).getId();
    }

    @Override
    public List<Account> getAllAccount() { return accountRepository.getAccountByRole(); }

    @Override
    public List<Account> getAccountByCompany(int id) {return accountRepository.findAccountByCompany(id); }

    @Override
    public List<Account> getAccountByStore(int id) {
        return accountRepository.findAccountByStore(id);
    }

    @Override
    public Account getDetailAccount(int id) {
        Account account = accountRepository.findAccountById(id);
//        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
//        account.setPassword(encoder.deaccount.getPassword());
        return accountRepository.findAccountById(id);
    }

    @Override
    public List<Account> getAccountsByUsername(String searchValue) { return accountRepository.searchByUsernameOrFullname(searchValue); }

    @Override
    public boolean updateAccount(Account account) {
        Account exitedAccount = accountRepository.findAccountById(account.getId());
        if (exitedAccount != null) {
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            account.setUpdatedDate(LocalDateTime.now().toString());
            account.setUpdatedBy(account.getUpdatedBy());
            account.setPassword(encoder.encode(account.getPassword()));
            accountRepository.save(account);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean inactiveAccount(Account account) {
        Account exitedAccount = accountRepository.findAccountById(account.getId());
        if (exitedAccount != null) {
            account.setUpdatedDate(LocalDateTime.now().toString());
            account.setUpdatedBy(account.getUpdatedBy());
            account.setStatus("inactive");
            accountRepository.save(account);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean activeAccount(Account account) {
        Account exitedAccount = accountRepository.findAccountById(account.getId());
        if (exitedAccount != null) {
            account.setUpdatedDate(LocalDateTime.now().toString());
            account.setUpdatedBy(account.getUpdatedBy());
            account.setStatus("active");
            accountRepository.save(account);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean createNewAccount(Account account) {
        Account exitedAccount = accountRepository.findByUsername(account.getUsername());
        if (exitedAccount != null) {
            return false;
        } else {
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            account.setCreatedDate(LocalDateTime.now().toString());
            account.setStatus("active");
            account.setPassword(encoder.encode(account.getPassword()));
            accountRepository.save(account);
            return true;
        }
    }


}
