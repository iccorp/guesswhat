package fr.iccorp.guesswhat.web.rest;

import com.codahale.metrics.annotation.Timed;
import fr.iccorp.guesswhat.service.AttemptService;
import fr.iccorp.guesswhat.web.rest.errors.BadRequestAlertException;
import fr.iccorp.guesswhat.web.rest.util.HeaderUtil;
import fr.iccorp.guesswhat.service.dto.AttemptDTO;
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
 * REST controller for managing Attempt.
 */
@RestController
@RequestMapping("/api")
public class AttemptResource {

    private final Logger log = LoggerFactory.getLogger(AttemptResource.class);

    private static final String ENTITY_NAME = "attempt";

    private final AttemptService attemptService;

    public AttemptResource(AttemptService attemptService) {
        this.attemptService = attemptService;
    }

    /**
     * POST  /attempts : Create a new attempt.
     *
     * @param attemptDTO the attemptDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new attemptDTO, or with status 400 (Bad Request) if the attempt has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/attempts")
    @Timed
    public ResponseEntity<AttemptDTO> createAttempt(@RequestBody AttemptDTO attemptDTO) throws URISyntaxException {
        log.debug("REST request to save Attempt : {}", attemptDTO);
        if (attemptDTO.getId() != null) {
            throw new BadRequestAlertException("A new attempt cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AttemptDTO result = attemptService.save(attemptDTO);
        return ResponseEntity.created(new URI("/api/attempts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /attempts : Updates an existing attempt.
     *
     * @param attemptDTO the attemptDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated attemptDTO,
     * or with status 400 (Bad Request) if the attemptDTO is not valid,
     * or with status 500 (Internal Server Error) if the attemptDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/attempts")
    @Timed
    public ResponseEntity<AttemptDTO> updateAttempt(@RequestBody AttemptDTO attemptDTO) throws URISyntaxException {
        log.debug("REST request to update Attempt : {}", attemptDTO);
        if (attemptDTO.getId() == null) {
            return createAttempt(attemptDTO);
        }
        AttemptDTO result = attemptService.save(attemptDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, attemptDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /attempts : get all the attempts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of attempts in body
     */
    @GetMapping("/attempts")
    @Timed
    public List<AttemptDTO> getAllAttempts() {
        log.debug("REST request to get all Attempts");
        return attemptService.findAll();
        }

    /**
     * GET  /attempts/:id : get the "id" attempt.
     *
     * @param id the id of the attemptDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the attemptDTO, or with status 404 (Not Found)
     */
    @GetMapping("/attempts/{id}")
    @Timed
    public ResponseEntity<AttemptDTO> getAttempt(@PathVariable Long id) {
        log.debug("REST request to get Attempt : {}", id);
        AttemptDTO attemptDTO = attemptService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(attemptDTO));
    }

    /**
     * DELETE  /attempts/:id : delete the "id" attempt.
     *
     * @param id the id of the attemptDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/attempts/{id}")
    @Timed
    public ResponseEntity<Void> deleteAttempt(@PathVariable Long id) {
        log.debug("REST request to delete Attempt : {}", id);
        attemptService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
