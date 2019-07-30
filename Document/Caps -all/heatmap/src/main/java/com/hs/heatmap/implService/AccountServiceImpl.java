package com.hs.heatmap.implService;

import com.hs.heatmap.model.Account;
import com.hs.heatmap.repository.AccountRepository;
import com.hs.heatmap.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Service(value = "accountService")
public class AccountServiceImpl implements AccountService, UserDetailsService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private BCryptPasswordEncoder bcryptEncoder;

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Account account = accountRepository.findByUsername(username);
        if(account == null){
            throw new UsernameNotFoundException("Invalid username or password.");
        }
        return new org.springframework.security.core.userdetails.User(account.getUsername(), account.getPassword(), getAuthority());
    }

    private List<SimpleGrantedAuthority> getAuthority() {
        return Arrays.asList(new SimpleGrantedAuthority("ROLE_ADMIN"));
    }

    @Override
    public Account getOne(String username) {
        return accountRepository.findAccountByUsername(username);
    }

    @Override
    public List<Account> getAllAccount() { return accountRepository.getAccountByRole(); }

    @Override
    public List<Account> getAccountByCompany(int id) {return accountRepository.findAccountByCompany(id); }

    @Override
    public Account getDetailAccount(int id) { return accountRepository.findAccountById(id); }

    @Override
    public List<Account> getAccountsByUsername(String searchValue) { return accountRepository.searchByUsernameOrFullname(searchValue); }

    @Override
    public Account updateAccount(Account account) {
        account.setUpdatedDate(LocalDateTime.now().toString());
        account.setUpdatedBy("cuongdq");
        return accountRepository.save(account);
    }

    @Override
    public Account inactiveAccount(Account account) {
        account.setUpdatedDate(LocalDateTime.now().toString());
        account.setUpdatedBy("cuongdq");
        account.setStatus("inactive");
        return accountRepository.save(account);
    }

    @Override
    public Account activeAccount(Account account) {
        account.setUpdatedDate(LocalDateTime.now().toString());
        account.setUpdatedBy("cuongdq");
        account.setStatus("active");
        return accountRepository.save(account);
    }

    @Override
    public Account createNewAccount(Account account) {
        if(accountRepository.findAccountByUsername(account.getUsername()) != null){
            return null;
        } else {
            account.setCreatedDate(LocalDateTime.now().toString());
            account.setStatus("active");
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            account.setPassword(encoder.encode(account.getPassword()));
            return accountRepository.save(account);
        }
    }


}
