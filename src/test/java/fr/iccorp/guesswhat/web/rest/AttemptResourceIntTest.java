package fr.iccorp.guesswhat.web.rest;

import fr.iccorp.guesswhat.GuesswhatApp;

import fr.iccorp.guesswhat.domain.Attempt;
import fr.iccorp.guesswhat.repository.AttemptRepository;
import fr.iccorp.guesswhat.service.AttemptService;
import fr.iccorp.guesswhat.service.dto.AttemptDTO;
import fr.iccorp.guesswhat.service.mapper.AttemptMapper;
import fr.iccorp.guesswhat.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static fr.iccorp.guesswhat.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the AttemptResource REST controller.
 *
 * @see AttemptResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GuesswhatApp.class)
public class AttemptResourceIntTest {

    private static final String DEFAULT_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_VALUE = "BBBBBBBBBB";

    private static final Boolean DEFAULT_IS_OK = false;
    private static final Boolean UPDATED_IS_OK = true;

    @Autowired
    private AttemptRepository attemptRepository;

    @Autowired
    private AttemptMapper attemptMapper;

    @Autowired
    private AttemptService attemptService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAttemptMockMvc;

    private Attempt attempt;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AttemptResource attemptResource = new AttemptResource(attemptService);
        this.restAttemptMockMvc = MockMvcBuilders.standaloneSetup(attemptResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Attempt createEntity(EntityManager em) {
        Attempt attempt = new Attempt()
            .value(DEFAULT_VALUE)
            .isOk(DEFAULT_IS_OK);
        return attempt;
    }

    @Before
    public void initTest() {
        attempt = createEntity(em);
    }

    @Test
    @Transactional
    public void createAttempt() throws Exception {
        int databaseSizeBeforeCreate = attemptRepository.findAll().size();

        // Create the Attempt
        AttemptDTO attemptDTO = attemptMapper.toDto(attempt);
        restAttemptMockMvc.perform(post("/api/attempts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(attemptDTO)))
            .andExpect(status().isCreated());

        // Validate the Attempt in the database
        List<Attempt> attemptList = attemptRepository.findAll();
        assertThat(attemptList).hasSize(databaseSizeBeforeCreate + 1);
        Attempt testAttempt = attemptList.get(attemptList.size() - 1);
        assertThat(testAttempt.getValue()).isEqualTo(DEFAULT_VALUE);
        assertThat(testAttempt.isIsOk()).isEqualTo(DEFAULT_IS_OK);
    }

    @Test
    @Transactional
    public void createAttemptWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = attemptRepository.findAll().size();

        // Create the Attempt with an existing ID
        attempt.setId(1L);
        AttemptDTO attemptDTO = attemptMapper.toDto(attempt);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAttemptMockMvc.perform(post("/api/attempts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(attemptDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Attempt in the database
        List<Attempt> attemptList = attemptRepository.findAll();
        assertThat(attemptList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAttempts() throws Exception {
        // Initialize the database
        attemptRepository.saveAndFlush(attempt);

        // Get all the attemptList
        restAttemptMockMvc.perform(get("/api/attempts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(attempt.getId().intValue())))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE.toString())))
            .andExpect(jsonPath("$.[*].isOk").value(hasItem(DEFAULT_IS_OK.booleanValue())));
    }

    @Test
    @Transactional
    public void getAttempt() throws Exception {
        // Initialize the database
        attemptRepository.saveAndFlush(attempt);

        // Get the attempt
        restAttemptMockMvc.perform(get("/api/attempts/{id}", attempt.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(attempt.getId().intValue()))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE.toString()))
            .andExpect(jsonPath("$.isOk").value(DEFAULT_IS_OK.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingAttempt() throws Exception {
        // Get the attempt
        restAttemptMockMvc.perform(get("/api/attempts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAttempt() throws Exception {
        // Initialize the database
        attemptRepository.saveAndFlush(attempt);
        int databaseSizeBeforeUpdate = attemptRepository.findAll().size();

        // Update the attempt
        Attempt updatedAttempt = attemptRepository.findOne(attempt.getId());
        // Disconnect from session so that the updates on updatedAttempt are not directly saved in db
        em.detach(updatedAttempt);
        updatedAttempt
            .value(UPDATED_VALUE)
            .isOk(UPDATED_IS_OK);
        AttemptDTO attemptDTO = attemptMapper.toDto(updatedAttempt);

        restAttemptMockMvc.perform(put("/api/attempts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(attemptDTO)))
            .andExpect(status().isOk());

        // Validate the Attempt in the database
        List<Attempt> attemptList = attemptRepository.findAll();
        assertThat(attemptList).hasSize(databaseSizeBeforeUpdate);
        Attempt testAttempt = attemptList.get(attemptList.size() - 1);
        assertThat(testAttempt.getValue()).isEqualTo(UPDATED_VALUE);
        assertThat(testAttempt.isIsOk()).isEqualTo(UPDATED_IS_OK);
    }

    @Test
    @Transactional
    public void updateNonExistingAttempt() throws Exception {
        int databaseSizeBeforeUpdate = attemptRepository.findAll().size();

        // Create the Attempt
        AttemptDTO attemptDTO = attemptMapper.toDto(attempt);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAttemptMockMvc.perform(put("/api/attempts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(attemptDTO)))
            .andExpect(status().isCreated());

        // Validate the Attempt in the database
        List<Attempt> attemptList = attemptRepository.findAll();
        assertThat(attemptList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAttempt() throws Exception {
        // Initialize the database
        attemptRepository.saveAndFlush(attempt);
        int databaseSizeBeforeDelete = attemptRepository.findAll().size();

        // Get the attempt
        restAttemptMockMvc.perform(delete("/api/attempts/{id}", attempt.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Attempt> attemptList = attemptRepository.findAll();
        assertThat(attemptList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Attempt.class);
        Attempt attempt1 = new Attempt();
        attempt1.setId(1L);
        Attempt attempt2 = new Attempt();
        attempt2.setId(attempt1.getId());
        assertThat(attempt1).isEqualTo(attempt2);
        attempt2.setId(2L);
        assertThat(attempt1).isNotEqualTo(attempt2);
        attempt1.setId(null);
        assertThat(attempt1).isNotEqualTo(attempt2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(AttemptDTO.class);
        AttemptDTO attemptDTO1 = new AttemptDTO();
        attemptDTO1.setId(1L);
        AttemptDTO attemptDTO2 = new AttemptDTO();
        assertThat(attemptDTO1).isNotEqualTo(attemptDTO2);
        attemptDTO2.setId(attemptDTO1.getId());
        assertThat(attemptDTO1).isEqualTo(attemptDTO2);
        attemptDTO2.setId(2L);
        assertThat(attemptDTO1).isNotEqualTo(attemptDTO2);
        attemptDTO1.setId(null);
        assertThat(attemptDTO1).isNotEqualTo(attemptDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(attemptMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(attemptMapper.fromId(null)).isNull();
    }
}
