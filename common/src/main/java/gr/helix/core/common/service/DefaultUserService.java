package gr.helix.core.common.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import gr.helix.core.common.domain.AccountEntity;
import gr.helix.core.common.model.EnumRole;
import gr.helix.core.common.model.user.Account;
import gr.helix.core.common.repository.AccountRepository;

@Service
public class DefaultUserService implements UserService {

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public Account findOneByUsername(String username) {
        final AccountEntity accountEntity = this.accountRepository.findOneByUsername(username);
        return accountEntity == null ? null : accountEntity.toDto();
    }

    @Override
    public Account findOneByEmail(String email) {
        final AccountEntity accountEntity = this.accountRepository.findOneByEmail(email);
        return accountEntity == null ? null : accountEntity.toDto();
    }

    @Override
    public Account findOne(int uid) {
        final Optional<AccountEntity> accountEntity = this.accountRepository.findById(uid);
        return accountEntity.isPresent() ? accountEntity.get().toDto() : null;
    }

    @Override
    @Transactional
    public Account createWith(Account account, String digestedPassword) {
        Assert.isTrue(account.getId() == null, "Not expecting an id for a new entity");

        // Copy account data

        AccountEntity entity = new AccountEntity(account.getUsername(), account.getEmail());

        entity.setLang(account.getLang());
        entity.setActive(account.isActive());
        entity.setBlocked(account.isBlocked());
        entity.setName(account.getGivenName(), account.getFamilyName());

        entity.setPassword(digestedPassword);

        // Grant roles

        for (final EnumRole role : account.getRoles()) {
            entity.grant(role, null);
        }

        // Save

        entity = this.accountRepository.saveAndFlush(entity);

        return entity.toDto();
    }

    @Override
    @Transactional
    public void grant(Account account, Account grantedby, EnumRole... roles) {
        Assert.notNull(account, "Expected a non-null account");
        Assert.notEmpty(roles, "Expected at least 1 role");

        final Optional<AccountEntity> accountEntity = this.accountRepository.findOne(this.example(account));
        if (!accountEntity.isPresent())
         {
            return; // no such account
        }

        final Optional<AccountEntity> grantedbyEntity = grantedby != null ? this.accountRepository.findOne(this.example(grantedby))
                : Optional.empty();

        for (final EnumRole role : roles) {
            accountEntity.get().grant(role, grantedbyEntity.isPresent() ? grantedbyEntity.get() : null);
        }

        this.accountRepository.saveAndFlush(accountEntity.get());
    }

    @Override
    @Transactional
    public void revoke(Account account, EnumRole... roles) {
        Assert.notNull(account, "Expected a non-null account");
        Assert.notEmpty(roles, "Expected at least 1 role");

        final Optional<AccountEntity> accountEntity = this.accountRepository.findOne(this.example(account));
        if (!accountEntity.isPresent())
         {
            return; // no such account
        }

        for (final EnumRole role : roles) {
            accountEntity.get().revoke(role);
        }

        this.accountRepository.saveAndFlush(accountEntity.get());
    }

    private Example<AccountEntity> example(Account account) {
        final Integer uid = account.getId();
        final String username = account.getUsername();

        AccountEntity probe = null;
        if (uid != null) {
            probe = new AccountEntity(uid);
        } else if (username != null) {
            probe = new AccountEntity(username, null);
        }
        return probe != null ? Example.of(probe) : null;
    }

}
