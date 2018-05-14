package fr.iccorp.guesswhat.service.mapper;

import fr.iccorp.guesswhat.domain.*;
import fr.iccorp.guesswhat.service.dto.ClueDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Clue and its DTO ClueDTO.
 */
@Mapper(componentModel = "spring", uses = {ChallengeMapper.class})
public interface ClueMapper extends EntityMapper<ClueDTO, Clue> {

    @Mapping(source = "challenge.id", target = "challengeId")
    ClueDTO toDto(Clue clue); 

    @Mapping(source = "challengeId", target = "challenge")
    Clue toEntity(ClueDTO clueDTO);

    default Clue fromId(Long id) {
        if (id == null) {
            return null;
        }
        Clue clue = new Clue();
        clue.setId(id);
        return clue;
    }
}
