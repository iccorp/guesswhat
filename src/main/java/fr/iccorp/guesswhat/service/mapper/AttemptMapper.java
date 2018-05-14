package fr.iccorp.guesswhat.service.mapper;

import fr.iccorp.guesswhat.domain.*;
import fr.iccorp.guesswhat.service.dto.AttemptDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Attempt and its DTO AttemptDTO.
 */
@Mapper(componentModel = "spring", uses = {ChallengeMapper.class, UserMapper.class})
public interface AttemptMapper extends EntityMapper<AttemptDTO, Attempt> {

    @Mapping(source = "challenge.id", target = "challengeId")
    @Mapping(source = "user.id", target = "userId")
    AttemptDTO toDto(Attempt attempt); 

    @Mapping(source = "challengeId", target = "challenge")
    @Mapping(source = "userId", target = "user")
    Attempt toEntity(AttemptDTO attemptDTO);

    default Attempt fromId(Long id) {
        if (id == null) {
            return null;
        }
        Attempt attempt = new Attempt();
        attempt.setId(id);
        return attempt;
    }
}
