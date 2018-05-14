package fr.iccorp.guesswhat.web.rest;

import com.codahale.metrics.annotation.Timed;
import fr.iccorp.guesswhat.service.ClueService;
import fr.iccorp.guesswhat.web.rest.errors.BadRequestAlertException;
import fr.iccorp.guesswhat.web.rest.util.HeaderUtil;
import fr.iccorp.guesswhat.service.dto.ClueDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Clue.
 */
@RestController
@RequestMapping("/api")
public class ClueResource {

    private final Logger log = LoggerFactory.getLogger(ClueResource.class);

    private static final String ENTITY_NAME = "clue";

    private final ClueService clueService;

    public ClueResource(ClueService clueService) {
        this.clueService = clueService;
    }

    /**
     * POST  /clues : Create a new clue.
     *
     * @param clueDTO the clueDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new clueDTO, or with status 400 (Bad Request) if the clue has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/clues")
    @Timed
    public ResponseEntity<ClueDTO> createClue(@RequestBody ClueDTO clueDTO) throws URISyntaxException {
        log.debug("REST request to save Clue : {}", clueDTO);
        if (clueDTO.getId() != null) {
            throw new BadRequestAlertException("A new clue cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ClueDTO result = clueService.save(clueDTO);
        return ResponseEntity.created(new URI("/api/clues/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /clues : Updates an existing clue.
     *
     * @param clueDTO the clueDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated clueDTO,
     * or with status 400 (Bad Request) if the clueDTO is not valid,
     * or with status 500 (Internal Server Error) if the clueDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/clues")
    @Timed
    public ResponseEntity<ClueDTO> updateClue(@RequestBody ClueDTO clueDTO) throws URISyntaxException {
        log.debug("REST request to update Clue : {}", clueDTO);
        if (clueDTO.getId() == null) {
            return createClue(clueDTO);
        }
        ClueDTO result = clueService.save(clueDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, clueDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /clues : get all the clues.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of clues in body
     */
    @GetMapping("/clues")
    @Timed
    public List<ClueDTO> getAllClues() {
        log.debug("REST request to get all Clues");
        return clueService.findAll();
        }

    /**
     * GET  /clues/:id : get the "id" clue.
     *
     * @param id the id of the clueDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the clueDTO, or with status 404 (Not Found)
     */
    @GetMapping("/clues/{id}")
    @Timed
    public ResponseEntity<ClueDTO> getClue(@PathVariable Long id) {
        log.debug("REST request to get Clue : {}", id);
        ClueDTO clueDTO = clueService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(clueDTO));
    }

    /**
     * DELETE  /clues/:id : delete the "id" clue.
     *
     * @param id the id of the clueDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/clues/{id}")
    @Timed
    public ResponseEntity<Void> deleteClue(@PathVariable Long id) {
        log.debug("REST request to delete Clue : {}", id);
        clueService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
