package fr.iccorp.guesswhat.web.rest;

import fr.iccorp.guesswhat.GuesswhatApp;

import fr.iccorp.guesswhat.domain.Clue;
import fr.iccorp.guesswhat.repository.ClueRepository;
import fr.iccorp.guesswhat.service.ClueService;
import fr.iccorp.guesswhat.service.dto.ClueDTO;
import fr.iccorp.guesswhat.service.mapper.ClueMapper;
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
 * Test class for the ClueResource REST controller.
 *
 * @see ClueResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GuesswhatApp.class)
public class ClueResourceIntTest {

    private static final String DEFAULT_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_VALUE = "BBBBBBBBBB";

    private static final Boolean DEFAULT_IS_VISIBLE = false;
    private static final Boolean UPDATED_IS_VISIBLE = true;

    @Autowired
    private ClueRepository clueRepository;

    @Autowired
    private ClueMapper clueMapper;

    @Autowired
    private ClueService clueService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restClueMockMvc;

    private Clue clue;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ClueResource clueResource = new ClueResource(clueService);
        this.restClueMockMvc = MockMvcBuilders.standaloneSetup(clueResource)
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
    public static Clue createEntity(EntityManager em) {
        Clue clue = new Clue()
            .value(DEFAULT_VALUE)
            .isVisible(DEFAULT_IS_VISIBLE);
        return clue;
    }

    @Before
    public void initTest() {
        clue = createEntity(em);
    }

    @Test
    @Transactional
    public void createClue() throws Exception {
        int databaseSizeBeforeCreate = clueRepository.findAll().size();

        // Create the Clue
        ClueDTO clueDTO = clueMapper.toDto(clue);
        restClueMockMvc.perform(post("/api/clues")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clueDTO)))
            .andExpect(status().isCreated());

        // Validate the Clue in the database
        List<Clue> clueList = clueRepository.findAll();
        assertThat(clueList).hasSize(databaseSizeBeforeCreate + 1);
        Clue testClue = clueList.get(clueList.size() - 1);
        assertThat(testClue.getValue()).isEqualTo(DEFAULT_VALUE);
        assertThat(testClue.isIsVisible()).isEqualTo(DEFAULT_IS_VISIBLE);
    }

    @Test
    @Transactional
    public void createClueWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = clueRepository.findAll().size();

        // Create the Clue with an existing ID
        clue.setId(1L);
        ClueDTO clueDTO = clueMapper.toDto(clue);

        // An entity with an existing ID cannot be created, so this API call must fail
        restClueMockMvc.perform(post("/api/clues")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clueDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Clue in the database
        List<Clue> clueList = clueRepository.findAll();
        assertThat(clueList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllClues() throws Exception {
        // Initialize the database
        clueRepository.saveAndFlush(clue);

        // Get all the clueList
        restClueMockMvc.perform(get("/api/clues?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(clue.getId().intValue())))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE.toString())))
            .andExpect(jsonPath("$.[*].isVisible").value(hasItem(DEFAULT_IS_VISIBLE.booleanValue())));
    }

    @Test
    @Transactional
    public void getClue() throws Exception {
        // Initialize the database
        clueRepository.saveAndFlush(clue);

        // Get the clue
        restClueMockMvc.perform(get("/api/clues/{id}", clue.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(clue.getId().intValue()))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE.toString()))
            .andExpect(jsonPath("$.isVisible").value(DEFAULT_IS_VISIBLE.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingClue() throws Exception {
        // Get the clue
        restClueMockMvc.perform(get("/api/clues/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateClue() throws Exception {
        // Initialize the database
        clueRepository.saveAndFlush(clue);
        int databaseSizeBeforeUpdate = clueRepository.findAll().size();

        // Update the clue
        Clue updatedClue = clueRepository.findOne(clue.getId());
        // Disconnect from session so that the updates on updatedClue are not directly saved in db
        em.detach(updatedClue);
        updatedClue
            .value(UPDATED_VALUE)
            .isVisible(UPDATED_IS_VISIBLE);
        ClueDTO clueDTO = clueMapper.toDto(updatedClue);

        restClueMockMvc.perform(put("/api/clues")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clueDTO)))
            .andExpect(status().isOk());

        // Validate the Clue in the database
        List<Clue> clueList = clueRepository.findAll();
        assertThat(clueList).hasSize(databaseSizeBeforeUpdate);
        Clue testClue = clueList.get(clueList.size() - 1);
        assertThat(testClue.getValue()).isEqualTo(UPDATED_VALUE);
        assertThat(testClue.isIsVisible()).isEqualTo(UPDATED_IS_VISIBLE);
    }

    @Test
    @Transactional
    public void updateNonExistingClue() throws Exception {
        int databaseSizeBeforeUpdate = clueRepository.findAll().size();

        // Create the Clue
        ClueDTO clueDTO = clueMapper.toDto(clue);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restClueMockMvc.perform(put("/api/clues")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clueDTO)))
            .andExpect(status().isCreated());

        // Validate the Clue in the database
        List<Clue> clueList = clueRepository.findAll();
        assertThat(clueList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteClue() throws Exception {
        // Initialize the database
        clueRepository.saveAndFlush(clue);
        int databaseSizeBeforeDelete = clueRepository.findAll().size();

        // Get the clue
        restClueMockMvc.perform(delete("/api/clues/{id}", clue.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Clue> clueList = clueRepository.findAll();
        assertThat(clueList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Clue.class);
        Clue clue1 = new Clue();
        clue1.setId(1L);
        Clue clue2 = new Clue();
        clue2.setId(clue1.getId());
        assertThat(clue1).isEqualTo(clue2);
        clue2.setId(2L);
        assertThat(clue1).isNotEqualTo(clue2);
        clue1.setId(null);
        assertThat(clue1).isNotEqualTo(clue2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ClueDTO.class);
        ClueDTO clueDTO1 = new ClueDTO();
        clueDTO1.setId(1L);
        ClueDTO clueDTO2 = new ClueDTO();
        assertThat(clueDTO1).isNotEqualTo(clueDTO2);
        clueDTO2.setId(clueDTO1.getId());
        assertThat(clueDTO1).isEqualTo(clueDTO2);
        clueDTO2.setId(2L);
        assertThat(clueDTO1).isNotEqualTo(clueDTO2);
        clueDTO1.setId(null);
        assertThat(clueDTO1).isNotEqualTo(clueDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(clueMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(clueMapper.fromId(null)).isNull();
    }
}
