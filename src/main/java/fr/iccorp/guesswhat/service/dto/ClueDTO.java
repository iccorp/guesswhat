package fr.iccorp.guesswhat.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Clue entity.
 */
public class ClueDTO implements Serializable {

    private Long id;

    private String value;

    private Boolean isVisible;

    private Long challengeId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public Boolean isIsVisible() {
        return isVisible;
    }

    public void setIsVisible(Boolean isVisible) {
        this.isVisible = isVisible;
    }

    public Long getChallengeId() {
        return challengeId;
    }

    public void setChallengeId(Long challengeId) {
        this.challengeId = challengeId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ClueDTO clueDTO = (ClueDTO) o;
        if(clueDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), clueDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ClueDTO{" +
            "id=" + getId() +
            ", value='" + getValue() + "'" +
            ", isVisible='" + isIsVisible() + "'" +
            "}";
    }
}
