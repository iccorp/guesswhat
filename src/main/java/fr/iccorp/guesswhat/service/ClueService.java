package fr.iccorp.guesswhat.service;

import fr.iccorp.guesswhat.service.dto.ClueDTO;
import java.util.List;

/**
 * Service Interface for managing Clue.
 */
public interface ClueService {

    /**
     * Save a clue.
     *
     * @param clueDTO the entity to save
     * @return the persisted entity
     */
    ClueDTO save(ClueDTO clueDTO);

    /**
     * Get all the clues.
     *
     * @return the list of entities
     */
    List<ClueDTO> findAll();

    /**
     * Get the "id" clue.
     *
     * @param id the id of the entity
     * @return the entity
     */
    ClueDTO findOne(Long id);

    /**
     * Delete the "id" clue.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
