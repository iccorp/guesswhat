package fr.iccorp.guesswhat.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Attempt.
 */
@Entity
@Table(name = "attempt")
public class Attempt implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "jhi_value")
    private String value;

    @Column(name = "is_ok")
    private Boolean isOk;

    @ManyToOne
    private Challenge challenge;

    @ManyToOne
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getValue() {
        return value;
    }

    public Attempt value(String value) {
        this.value = value;
        return this;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public Boolean isIsOk() {
        return isOk;
    }

    public Attempt isOk(Boolean isOk) {
        this.isOk = isOk;
        return this;
    }

    public void setIsOk(Boolean isOk) {
        this.isOk = isOk;
    }

    public Challenge getChallenge() {
        return challenge;
    }

    public Attempt challenge(Challenge challenge) {
        this.challenge = challenge;
        return this;
    }

    public void setChallenge(Challenge challenge) {
        this.challenge = challenge;
    }

    public User getUser() {
        return user;
    }

    public Attempt user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Attempt attempt = (Attempt) o;
        if (attempt.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), attempt.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Attempt{" +
            "id=" + getId() +
            ", value='" + getValue() + "'" +
            ", isOk='" + isIsOk() + "'" +
            "}";
    }
}
