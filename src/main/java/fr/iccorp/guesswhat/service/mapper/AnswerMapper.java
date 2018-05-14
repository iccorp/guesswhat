package fr.iccorp.guesswhat.service.mapper;

import fr.iccorp.guesswhat.domain.*;
import fr.iccorp.guesswhat.service.dto.AnswerDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Answer and its DTO AnswerDTO.
 */
@Mapper(componentModel = "spring", uses = {ChallengeMapper.class})
public interface AnswerMapper extends EntityMapper<AnswerDTO, Answer> {

    @Mapping(source = "challenge.id", target = "challengeId")
    AnswerDTO toDto(Answer answer); 

    @Mapping(source = "challengeId", target = "challenge")
    Answer toEntity(AnswerDTO answerDTO);

    default Answer fromId(Long id) {
        if (id == null) {
            return null;
        }
        Answer answer = new Answer();
        answer.setId(id);
        return answer;
    }
}
