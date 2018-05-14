package fr.iccorp.guesswhat.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Attempt entity.
 */
public class AttemptDTO implements Serializable {

    private Long id;

    private String value;

    private Boolean isOk;

    private Long challengeId;

    private Long userId;

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

    public Boolean isIsOk() {
        return isOk;
    }

    public void setIsOk(Boolean isOk) {
        this.isOk = isOk;
    }

    public Long getChallengeId() {
        return challengeId;
    }

    public void setChallengeId(Long challengeId) {
        this.challengeId = challengeId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        AttemptDTO attemptDTO = (AttemptDTO) o;
        if(attemptDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), attemptDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AttemptDTO{" +
            "id=" + getId() +
            ", value='" + getValue() + "'" +
            ", isOk='" + isIsOk() + "'" +
            "}";
    }
}
