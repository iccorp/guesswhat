package fr.iccorp.guesswhat.service.impl;

import fr.iccorp.guesswhat.service.ChallengeService;
import fr.iccorp.guesswhat.domain.Challenge;
import fr.iccorp.guesswhat.repository.ChallengeRepository;
import fr.iccorp.guesswhat.service.dto.ChallengeDTO;
import fr.iccorp.guesswhat.service.mapper.ChallengeMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Challenge.
 */
@Service
@Transactional
public class ChallengeServiceImpl implements ChallengeService{

    private final Logger log = LoggerFactory.getLogger(ChallengeServiceImpl.class);

    private final ChallengeRepository challengeRepository;

    private final ChallengeMapper challengeMapper;

    public ChallengeServiceImpl(ChallengeRepository challengeRepository, ChallengeMapper challengeMapper) {
        this.challengeRepository = challengeRepository;
        this.challengeMapper = challengeMapper;
    }

    /**
     * Save a challenge.
     *
     * @param challengeDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ChallengeDTO save(ChallengeDTO challengeDTO) {
        log.debug("Request to save Challenge : {}", challengeDTO);
        Challenge challenge = challengeMapper.toEntity(challengeDTO);
        challenge = challengeRepository.save(challenge);
        return challengeMapper.toDto(challenge);
    }

    /**
     * Get all the challenges.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ChallengeDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Challenges");
        return challengeRepository.findAll(pageable)
            .map(challengeMapper::toDto);
    }

    /**
     * Get one challenge by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ChallengeDTO findOne(Long id) {
        log.debug("Request to get Challenge : {}", id);
        Challenge challenge = challengeRepository.findOneWithEagerRelationships(id);
        return challengeMapper.toDto(challenge);
    }

    /**
     * Delete the challenge by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Challenge : {}", id);
        challengeRepository.delete(id);
    }
}
