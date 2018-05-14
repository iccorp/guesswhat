package fr.iccorp.guesswhat.service.impl;

import fr.iccorp.guesswhat.service.AttemptService;
import fr.iccorp.guesswhat.domain.Attempt;
import fr.iccorp.guesswhat.repository.AttemptRepository;
import fr.iccorp.guesswhat.service.dto.AttemptDTO;
import fr.iccorp.guesswhat.service.mapper.AttemptMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Attempt.
 */
@Service
@Transactional
public class AttemptServiceImpl implements AttemptService{

    private final Logger log = LoggerFactory.getLogger(AttemptServiceImpl.class);

    private final AttemptRepository attemptRepository;

    private final AttemptMapper attemptMapper;

    public AttemptServiceImpl(AttemptRepository attemptRepository, AttemptMapper attemptMapper) {
        this.attemptRepository = attemptRepository;
        this.attemptMapper = attemptMapper;
    }

    /**
     * Save a attempt.
     *
     * @param attemptDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public AttemptDTO save(AttemptDTO attemptDTO) {
        log.debug("Request to save Attempt : {}", attemptDTO);
        Attempt attempt = attemptMapper.toEntity(attemptDTO);
        attempt = attemptRepository.save(attempt);
        return attemptMapper.toDto(attempt);
    }

    /**
     * Get all the attempts.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<AttemptDTO> findAll() {
        log.debug("Request to get all Attempts");
        return attemptRepository.findAll().stream()
            .map(attemptMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one attempt by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public AttemptDTO findOne(Long id) {
        log.debug("Request to get Attempt : {}", id);
        Attempt attempt = attemptRepository.findOne(id);
        return attemptMapper.toDto(attempt);
    }

    /**
     * Delete the attempt by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Attempt : {}", id);
        attemptRepository.delete(id);
    }
}
