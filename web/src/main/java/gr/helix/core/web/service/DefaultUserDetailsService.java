package gr.helix.core.web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import gr.helix.core.common.domain.AccountEntity;
import gr.helix.core.common.repository.AccountRepository;
import gr.helix.core.web.model.security.User;

@Service
public class DefaultUserDetailsService implements UserDetailsService {

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        final AccountEntity accountEntity = this.accountRepository.findOneByEmail(username);
        if (accountEntity == null) {
            throw new UsernameNotFoundException(username);
        }
        return new User(accountEntity.toDto(), accountEntity.getPassword());
    }

}
