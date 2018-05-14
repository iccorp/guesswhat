package fr.iccorp.guesswhat.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Challenge entity.
 */
public class ChallengeDTO implements Serializable {

    private Long id;

    private String name;

    private String question;

    private Long userId;

    private Set<CategoryDTO> categories = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Set<CategoryDTO> getCategories() {
        return categories;
    }

    public void setCategories(Set<CategoryDTO> categories) {
        this.categories = categories;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ChallengeDTO challengeDTO = (ChallengeDTO) o;
        if(challengeDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), challengeDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ChallengeDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", question='" + getQuestion() + "'" +
            "}";
    }
}
