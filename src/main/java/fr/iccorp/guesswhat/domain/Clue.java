package fr.iccorp.guesswhat.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Clue.
 */
@Entity
@Table(name = "clue")
public class Clue implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "jhi_value")
    private String value;

    @Column(name = "is_visible")
    private Boolean isVisible;

    @ManyToOne
    private Challenge challenge;

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

    public Clue value(String value) {
        this.value = value;
        return this;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public Boolean isIsVisible() {
        return isVisible;
    }

    public Clue isVisible(Boolean isVisible) {
        this.isVisible = isVisible;
        return this;
    }

    public void setIsVisible(Boolean isVisible) {
        this.isVisible = isVisible;
    }

    public Challenge getChallenge() {
        return challenge;
    }

    public Clue challenge(Challenge challenge) {
        this.challenge = challenge;
        return this;
    }

    public void setChallenge(Challenge challenge) {
        this.challenge = challenge;
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
        Clue clue = (Clue) o;
        if (clue.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), clue.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Clue{" +
            "id=" + getId() +
            ", value='" + getValue() + "'" +
            ", isVisible='" + isIsVisible() + "'" +
            "}";
    }
}
