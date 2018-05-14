package fr.iccorp.guesswhat.service.impl;

import fr.iccorp.guesswhat.service.ClueService;
import fr.iccorp.guesswhat.domain.Clue;
import fr.iccorp.guesswhat.repository.ClueRepository;
import fr.iccorp.guesswhat.service.dto.ClueDTO;
import fr.iccorp.guesswhat.service.mapper.ClueMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Clue.
 */
@Service
@Transactional
public class ClueServiceImpl implements ClueService{

    private final Logger log = LoggerFactory.getLogger(ClueServiceImpl.class);

    private final ClueRepository clueRepository;

    private final ClueMapper clueMapper;

    public ClueServiceImpl(ClueRepository clueRepository, ClueMapper clueMapper) {
        this.clueRepository = clueRepository;
        this.clueMapper = clueMapper;
    }

    /**
     * Save a clue.
     *
     * @param clueDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ClueDTO save(ClueDTO clueDTO) {
        log.debug("Request to save Clue : {}", clueDTO);
        Clue clue = clueMapper.toEntity(clueDTO);
        clue = clueRepository.save(clue);
        return clueMapper.toDto(clue);
    }

    /**
     * Get all the clues.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<ClueDTO> findAll() {
        log.debug("Request to get all Clues");
        return clueRepository.findAll().stream()
            .map(clueMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one clue by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ClueDTO findOne(Long id) {
        log.debug("Request to get Clue : {}", id);
        Clue clue = clueRepository.findOne(id);
        return clueMapper.toDto(clue);
    }

    /**
     * Delete the clue by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Clue : {}", id);
        clueRepository.delete(id);
    }
}
