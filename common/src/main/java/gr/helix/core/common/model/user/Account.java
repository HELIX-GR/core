package gr.helix.core.common.model.user;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Arrays;
import java.util.EnumSet;
import java.util.Set;
import java.util.stream.Collectors;

import org.apache.commons.lang3.StringUtils;

import com.fasterxml.jackson.annotation.JsonIgnore;

import gr.helix.core.common.model.EnumRole;

/**
 * A simple DTO object for AccountEntity
 */
public class Account implements Serializable {

    private static final long serialVersionUID = 1L;

    @JsonIgnore()
    private Integer           id;

    private String            username;

    private String            email;

    @JsonIgnore()
    private String            givenName;

    @JsonIgnore()
    private String            familyName;

    private String            name;

    private String            lang;

    @JsonIgnore()
    private boolean           active           = true;

    @JsonIgnore()
    private boolean           blocked          = false;

    private String            imageUrl;

    @JsonIgnore()
    private ZonedDateTime     registeredAt;

    private Set<EnumRole>     roles            = EnumSet.noneOf(EnumRole.class);

    protected Account() {
    }

    public Account(String username) {
        this.username = username;
    }

    public Account(String username, String email) {
        this.username = username;
        this.email = email;
    }

    public Account(Integer id, String username, String email) {
        this.id = id;
        this.username = username;
        this.email = email;
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getGivenName() {
        return this.givenName;
    }

    public void setGivenName(String givenName) {
        this.givenName = givenName;
    }

    public String getFamilyName() {
        return this.familyName;
    }

    public void setFamilyName(String familyName) {
        this.familyName = familyName;
    }

    public String getName() {
        if (StringUtils.isBlank(this.name)) {
            return String.format("%s %s", this.givenName, this.familyName).trim();
        }
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLang() {
        return this.lang;
    }

    public void setLang(String lang) {
        this.lang = lang;
    }

    @JsonIgnore
    public boolean isActive() {
        return this.active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    @JsonIgnore
    public boolean isBlocked() {
        return this.blocked;
    }

    public void setBlocked(boolean blocked) {
        this.blocked = blocked;
    }

    public Set<EnumRole> getRoles() {
        return this.roles;
    }

    public void setRoles(Set<EnumRole> roles) {
        this.roles = roles;
    }

    public void setRoles(EnumRole... roles) {
        this.roles = Arrays.stream(roles).collect(Collectors.toSet());
    }

    public String getImageUrl() {
        return this.imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public ZonedDateTime getRegisteredAt() {
        return this.registeredAt;
    }

    public void setRegisteredAt(ZonedDateTime registeredAt) {
        this.registeredAt = registeredAt;
    }

}
