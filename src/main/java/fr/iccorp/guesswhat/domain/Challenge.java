package fr.iccorp.guesswhat.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Challenge.
 */
@Entity
@Table(name = "challenge")
public class Challenge implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "question")
    private String question;

    @ManyToOne
    private User user;

    @ManyToMany
    @JoinTable(name = "challenge_category",
               joinColumns = @JoinColumn(name="challenges_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="categories_id", referencedColumnName="id"))
    private Set<Category> categories = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Challenge name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getQuestion() {
        return question;
    }

    public Challenge question(String question) {
        this.question = question;
        return this;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public User getUser() {
        return user;
    }

    public Challenge user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Category> getCategories() {
        return categories;
    }

    public Challenge categories(Set<Category> categories) {
        this.categories = categories;
        return this;
    }

    public Challenge addCategory(Category category) {
        this.categories.add(category);
        category.getChallenges().add(this);
        return this;
    }

    public Challenge removeCategory(Category category) {
        this.categories.remove(category);
        category.getChallenges().remove(this);
        return this;
    }

    public void setCategories(Set<Category> categories) {
        this.categories = categories;
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
        Challenge challenge = (Challenge) o;
        if (challenge.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), challenge.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Challenge{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", question='" + getQuestion() + "'" +
            "}";
    }
}
