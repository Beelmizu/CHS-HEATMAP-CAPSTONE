package com.hs.heatmap.implService;

import com.hs.heatmap.model.Account;
import com.hs.heatmap.repository.AccountRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final AccountRepository accountRepository;

    public UserDetailsServiceImpl(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Account account = accountRepository.findByUsername(username);
        String role;

        if (account == null) {
            throw new UsernameNotFoundException(username);
        }

        if (account.isRole()) {
            role = "Administrator";
        } else {
            role = "Manager";
        }

        Collection<GrantedAuthority> authorities = Collections.singletonList(
                new SimpleGrantedAuthority(role));

        System.out.println(account.getUsername() +
                account.getPassword());

        return new User(account.getUsername(),
                account.getPassword(),
                authorities);
    }
}
