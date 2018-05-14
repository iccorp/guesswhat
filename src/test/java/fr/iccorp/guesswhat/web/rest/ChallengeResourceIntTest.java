package fr.iccorp.guesswhat.web.rest;

import fr.iccorp.guesswhat.GuesswhatApp;

import fr.iccorp.guesswhat.domain.Challenge;
import fr.iccorp.guesswhat.repository.ChallengeRepository;
import fr.iccorp.guesswhat.service.ChallengeService;
import fr.iccorp.guesswhat.service.dto.ChallengeDTO;
import fr.iccorp.guesswhat.service.mapper.ChallengeMapper;
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
 * Test class for the ChallengeResource REST controller.
 *
 * @see ChallengeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GuesswhatApp.class)
public class ChallengeResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_QUESTION = "AAAAAAAAAA";
    private static final String UPDATED_QUESTION = "BBBBBBBBBB";

    @Autowired
    private ChallengeRepository challengeRepository;

    @Autowired
    private ChallengeMapper challengeMapper;

    @Autowired
    private ChallengeService challengeService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restChallengeMockMvc;

    private Challenge challenge;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ChallengeResource challengeResource = new ChallengeResource(challengeService);
        this.restChallengeMockMvc = MockMvcBuilders.standaloneSetup(challengeResource)
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
    public static Challenge createEntity(EntityManager em) {
        Challenge challenge = new Challenge()
            .name(DEFAULT_NAME)
            .question(DEFAULT_QUESTION);
        return challenge;
    }

    @Before
    public void initTest() {
        challenge = createEntity(em);
    }

    @Test
    @Transactional
    public void createChallenge() throws Exception {
        int databaseSizeBeforeCreate = challengeRepository.findAll().size();

        // Create the Challenge
        ChallengeDTO challengeDTO = challengeMapper.toDto(challenge);
        restChallengeMockMvc.perform(post("/api/challenges")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(challengeDTO)))
            .andExpect(status().isCreated());

        // Validate the Challenge in the database
        List<Challenge> challengeList = challengeRepository.findAll();
        assertThat(challengeList).hasSize(databaseSizeBeforeCreate + 1);
        Challenge testChallenge = challengeList.get(challengeList.size() - 1);
        assertThat(testChallenge.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testChallenge.getQuestion()).isEqualTo(DEFAULT_QUESTION);
    }

    @Test
    @Transactional
    public void createChallengeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = challengeRepository.findAll().size();

        // Create the Challenge with an existing ID
        challenge.setId(1L);
        ChallengeDTO challengeDTO = challengeMapper.toDto(challenge);

        // An entity with an existing ID cannot be created, so this API call must fail
        restChallengeMockMvc.perform(post("/api/challenges")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(challengeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Challenge in the database
        List<Challenge> challengeList = challengeRepository.findAll();
        assertThat(challengeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllChallenges() throws Exception {
        // Initialize the database
        challengeRepository.saveAndFlush(challenge);

        // Get all the challengeList
        restChallengeMockMvc.perform(get("/api/challenges?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(challenge.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].question").value(hasItem(DEFAULT_QUESTION.toString())));
    }

    @Test
    @Transactional
    public void getChallenge() throws Exception {
        // Initialize the database
        challengeRepository.saveAndFlush(challenge);

        // Get the challenge
        restChallengeMockMvc.perform(get("/api/challenges/{id}", challenge.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(challenge.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.question").value(DEFAULT_QUESTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingChallenge() throws Exception {
        // Get the challenge
        restChallengeMockMvc.perform(get("/api/challenges/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateChallenge() throws Exception {
        // Initialize the database
        challengeRepository.saveAndFlush(challenge);
        int databaseSizeBeforeUpdate = challengeRepository.findAll().size();

        // Update the challenge
        Challenge updatedChallenge = challengeRepository.findOne(challenge.getId());
        // Disconnect from session so that the updates on updatedChallenge are not directly saved in db
        em.detach(updatedChallenge);
        updatedChallenge
            .name(UPDATED_NAME)
            .question(UPDATED_QUESTION);
        ChallengeDTO challengeDTO = challengeMapper.toDto(updatedChallenge);

        restChallengeMockMvc.perform(put("/api/challenges")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(challengeDTO)))
            .andExpect(status().isOk());

        // Validate the Challenge in the database
        List<Challenge> challengeList = challengeRepository.findAll();
        assertThat(challengeList).hasSize(databaseSizeBeforeUpdate);
        Challenge testChallenge = challengeList.get(challengeList.size() - 1);
        assertThat(testChallenge.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testChallenge.getQuestion()).isEqualTo(UPDATED_QUESTION);
    }

    @Test
    @Transactional
    public void updateNonExistingChallenge() throws Exception {
        int databaseSizeBeforeUpdate = challengeRepository.findAll().size();

        // Create the Challenge
        ChallengeDTO challengeDTO = challengeMapper.toDto(challenge);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restChallengeMockMvc.perform(put("/api/challenges")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(challengeDTO)))
            .andExpect(status().isCreated());

        // Validate the Challenge in the database
        List<Challenge> challengeList = challengeRepository.findAll();
        assertThat(challengeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteChallenge() throws Exception {
        // Initialize the database
        challengeRepository.saveAndFlush(challenge);
        int databaseSizeBeforeDelete = challengeRepository.findAll().size();

        // Get the challenge
        restChallengeMockMvc.perform(delete("/api/challenges/{id}", challenge.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Challenge> challengeList = challengeRepository.findAll();
        assertThat(challengeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Challenge.class);
        Challenge challenge1 = new Challenge();
        challenge1.setId(1L);
        Challenge challenge2 = new Challenge();
        challenge2.setId(challenge1.getId());
        assertThat(challenge1).isEqualTo(challenge2);
        challenge2.setId(2L);
        assertThat(challenge1).isNotEqualTo(challenge2);
        challenge1.setId(null);
        assertThat(challenge1).isNotEqualTo(challenge2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ChallengeDTO.class);
        ChallengeDTO challengeDTO1 = new ChallengeDTO();
        challengeDTO1.setId(1L);
        ChallengeDTO challengeDTO2 = new ChallengeDTO();
        assertThat(challengeDTO1).isNotEqualTo(challengeDTO2);
        challengeDTO2.setId(challengeDTO1.getId());
        assertThat(challengeDTO1).isEqualTo(challengeDTO2);
        challengeDTO2.setId(2L);
        assertThat(challengeDTO1).isNotEqualTo(challengeDTO2);
        challengeDTO1.setId(null);
        assertThat(challengeDTO1).isNotEqualTo(challengeDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(challengeMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(challengeMapper.fromId(null)).isNull();
    }
}
