package fr.iccorp.guesswhat.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import javax.persistence.Lob;
import fr.iccorp.guesswhat.domain.enumeration.AwardType;

/**
 * A DTO for the Award entity.
 */
public class AwardDTO implements Serializable {

    private Long id;

    private AwardType type;

    private String value;

    @Lob
    private byte[] image;
    private String imageContentType;

    private Long challengeId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public AwardType getType() {
        return type;
    }

    public void setType(AwardType type) {
        this.type = type;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageContentType() {
        return imageContentType;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
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

        AwardDTO awardDTO = (AwardDTO) o;
        if(awardDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), awardDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AwardDTO{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            ", value='" + getValue() + "'" +
            ", image='" + getImage() + "'" +
            "}";
    }
}
