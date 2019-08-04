package com.hs.heatmap.implService;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.hs.heatmap.model.Account;
import com.hs.heatmap.repository.AccountRepository;
import com.hs.heatmap.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static com.hs.heatmap.constants.SecurityConstant.JWT_SECRET;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public Integer getIDByUsername(String username) {
        return accountRepository.findByUsername(username).getId();
    }

    @Override
    public List<Account> getAllAccount() { return accountRepository.getAccountByRole(); }

    @Override
    public List<Account> getAccountByCompany(int id) {return accountRepository.findAccountByCompany(id); }

    @Override
    public List<Account> getAllAccountByCompanyNotBelongToThisStore(int comID, int accID) {
        List<Account> accountsInCompany = accountRepository.findAccountByCompany(comID);
        List<Account> accountsInStore = accountRepository.getAllAccountByCompanyBelongToThisStore(comID, accID);
        List<Account> result = new ArrayList<>(accountsInCompany);
        result.removeAll(accountsInStore);
        return result;
    }

    @Override
    public List<Account> getAccountByStore(int id) {
        return accountRepository.findAccountByStore(id);
    }

    @Override
    public Account getDetailAccount(int id) {
        Account account = accountRepository.findAccountById(id);
        return account;
    }

    @Override
    public List<Account> getAccountsByUsername(String searchValue) {
        return accountRepository.searchByUsernameOrFullname(searchValue);
    }

    @Override
    public boolean updateAccount(Account account) {
        Account exitedAccount = accountRepository.findAccountById(account.getId());
        if (exitedAccount != null) {
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            account.setUpdatedDate(LocalDateTime.now().toString());
            account.setUpdatedBy(account.getUpdatedBy());
//            account.setPassword(encoder.encode(account.getPassword()));
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
    public List<Account> getAccountInCompanyByUsernameOrFullname(String searchValue, int companyID) {
        return accountRepository.getAccountInCompanyByUsernameOrFullname(searchValue, companyID);
    }

    @Override
    public List<Account> getAccountInStoreByUsernameOrFullname(String searchValue, int storeID) {
        return accountRepository.getAccountInStoreByUsernameOrFullname(searchValue, storeID);
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

    @Override
    public boolean addAccountToStore(String accountID, String storeID) {
        int result = accountRepository.addAccountToStore(LocalDateTime.now().toString(), Integer.parseInt(accountID), Integer.parseInt(storeID));
        if (result != 1) {
            return false;
        } else {
            return true;
        }
    }

    @Override
    public boolean deleteAccountInStore(String accountID, String storeID) {
        int result = accountRepository.deleteAccountInStore(Integer.parseInt(accountID), Integer.parseInt(storeID));
        if (result != 1) {
            return false;
        } else {
            return true;
        }
    }

    @Override
    public boolean changePassword(String accountID, String oldPass, String newPass, String updatedBy) {
        Account account = accountRepository.findAccountById(Integer.parseInt(accountID));
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        if (!passwordEncoder.matches(oldPass, account.getPassword())) {
            return false;
        } else {
            account.setUpdatedDate(LocalDateTime.now().toString());
            account.setUpdatedBy(updatedBy);
            account.setPassword(encoder.encode(newPass));
            accountRepository.save(account);
            return true;
        }
    }

}
