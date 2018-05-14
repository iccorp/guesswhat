package fr.iccorp.guesswhat.service;

import fr.iccorp.guesswhat.service.dto.AttemptDTO;
import java.util.List;

/**
 * Service Interface for managing Attempt.
 */
public interface AttemptService {

    /**
     * Save a attempt.
     *
     * @param attemptDTO the entity to save
     * @return the persisted entity
     */
    AttemptDTO save(AttemptDTO attemptDTO);

    /**
     * Get all the attempts.
     *
     * @return the list of entities
     */
    List<AttemptDTO> findAll();

    /**
     * Get the "id" attempt.
     *
     * @param id the id of the entity
     * @return the entity
     */
    AttemptDTO findOne(Long id);

    /**
     * Delete the "id" attempt.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
