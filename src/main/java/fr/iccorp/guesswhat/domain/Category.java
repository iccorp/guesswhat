package fr.iccorp.guesswhat.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Category.
 */
@Entity
@Table(name = "category")
public class Category implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "jhi_value")
    private String value;

    @ManyToMany(mappedBy = "categories")
    @JsonIgnore
    private Set<Challenge> challenges = new HashSet<>();

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

    public Category value(String value) {
        this.value = value;
        return this;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public Set<Challenge> getChallenges() {
        return challenges;
    }

    public Category challenges(Set<Challenge> challenges) {
        this.challenges = challenges;
        return this;
    }

    public Category addChallenge(Challenge challenge) {
        this.challenges.add(challenge);
        challenge.getCategories().add(this);
        return this;
    }

    public Category removeChallenge(Challenge challenge) {
        this.challenges.remove(challenge);
        challenge.getCategories().remove(this);
        return this;
    }

    public void setChallenges(Set<Challenge> challenges) {
        this.challenges = challenges;
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
        Category category = (Category) o;
        if (category.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), category.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Category{" +
            "id=" + getId() +
            ", value='" + getValue() + "'" +
            "}";
    }
}
