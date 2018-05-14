package fr.iccorp.guesswhat.service;

import fr.iccorp.guesswhat.service.dto.AwardDTO;
import java.util.List;

/**
 * Service Interface for managing Award.
 */
public interface AwardService {

    /**
     * Save a award.
     *
     * @param awardDTO the entity to save
     * @return the persisted entity
     */
    AwardDTO save(AwardDTO awardDTO);

    /**
     * Get all the awards.
     *
     * @return the list of entities
     */
    List<AwardDTO> findAll();

    /**
     * Get the "id" award.
     *
     * @param id the id of the entity
     * @return the entity
     */
    AwardDTO findOne(Long id);

    /**
     * Delete the "id" award.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
