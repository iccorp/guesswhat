package fr.iccorp.guesswhat.service.mapper;

import fr.iccorp.guesswhat.domain.*;
import fr.iccorp.guesswhat.service.dto.ChallengeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Challenge and its DTO ChallengeDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, CategoryMapper.class})
public interface ChallengeMapper extends EntityMapper<ChallengeDTO, Challenge> {

    @Mapping(source = "user.id", target = "userId")
    ChallengeDTO toDto(Challenge challenge); 

    @Mapping(source = "userId", target = "user")
    Challenge toEntity(ChallengeDTO challengeDTO);

    default Challenge fromId(Long id) {
        if (id == null) {
            return null;
        }
        Challenge challenge = new Challenge();
        challenge.setId(id);
        return challenge;
    }
}
