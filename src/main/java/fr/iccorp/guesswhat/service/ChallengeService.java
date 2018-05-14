package fr.iccorp.guesswhat.service;

import fr.iccorp.guesswhat.service.dto.ChallengeDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Challenge.
 */
public interface ChallengeService {

    /**
     * Save a challenge.
     *
     * @param challengeDTO the entity to save
     * @return the persisted entity
     */
    ChallengeDTO save(ChallengeDTO challengeDTO);

    /**
     * Get all the challenges.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<ChallengeDTO> findAll(Pageable pageable);

    /**
     * Get the "id" challenge.
     *
     * @param id the id of the entity
     * @return the entity
     */
    ChallengeDTO findOne(Long id);

    /**
     * Delete the "id" challenge.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
