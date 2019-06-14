package com.hs.heatmap.implService;

import com.hs.heatmap.model.Account;
import com.hs.heatmap.repository.AccountRepository;
import com.hs.heatmap.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public List<Account> getAllAccount() {
        return accountRepository.getAccountByRole();
    }

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
    public Account deleteAccount(Account account) {
        account.setStatus("inactive");
        return accountRepository.save(account);
    }

    @Override
    public Account createNewAccount(Account account) {
        if(accountRepository.findAccountByUsername(account.getUsername()) != null){
            return null;
        } else {
            account.setCreatedDate(LocalDateTime.now().toString());
            account.setStatus("active");
            return accountRepository.save(account);
        }
    }


}
