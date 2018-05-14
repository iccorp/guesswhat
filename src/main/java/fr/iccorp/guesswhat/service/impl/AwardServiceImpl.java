package fr.iccorp.guesswhat.service.impl;

import fr.iccorp.guesswhat.service.AwardService;
import fr.iccorp.guesswhat.domain.Award;
import fr.iccorp.guesswhat.repository.AwardRepository;
import fr.iccorp.guesswhat.service.dto.AwardDTO;
import fr.iccorp.guesswhat.service.mapper.AwardMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Award.
 */
@Service
@Transactional
public class AwardServiceImpl implements AwardService{

    private final Logger log = LoggerFactory.getLogger(AwardServiceImpl.class);

    private final AwardRepository awardRepository;

    private final AwardMapper awardMapper;

    public AwardServiceImpl(AwardRepository awardRepository, AwardMapper awardMapper) {
        this.awardRepository = awardRepository;
        this.awardMapper = awardMapper;
    }

    /**
     * Save a award.
     *
     * @param awardDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public AwardDTO save(AwardDTO awardDTO) {
        log.debug("Request to save Award : {}", awardDTO);
        Award award = awardMapper.toEntity(awardDTO);
        award = awardRepository.save(award);
        return awardMapper.toDto(award);
    }

    /**
     * Get all the awards.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<AwardDTO> findAll() {
        log.debug("Request to get all Awards");
        return awardRepository.findAll().stream()
            .map(awardMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one award by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public AwardDTO findOne(Long id) {
        log.debug("Request to get Award : {}", id);
        Award award = awardRepository.findOne(id);
        return awardMapper.toDto(award);
    }

    /**
     * Delete the award by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Award : {}", id);
        awardRepository.delete(id);
    }
}
