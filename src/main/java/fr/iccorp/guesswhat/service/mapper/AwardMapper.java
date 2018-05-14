package fr.iccorp.guesswhat.service.mapper;

import fr.iccorp.guesswhat.domain.*;
import fr.iccorp.guesswhat.service.dto.AwardDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Award and its DTO AwardDTO.
 */
@Mapper(componentModel = "spring", uses = {ChallengeMapper.class})
public interface AwardMapper extends EntityMapper<AwardDTO, Award> {

    @Mapping(source = "challenge.id", target = "challengeId")
    AwardDTO toDto(Award award); 

    @Mapping(source = "challengeId", target = "challenge")
    Award toEntity(AwardDTO awardDTO);

    default Award fromId(Long id) {
        if (id == null) {
            return null;
        }
        Award award = new Award();
        award.setId(id);
        return award;
    }
}
