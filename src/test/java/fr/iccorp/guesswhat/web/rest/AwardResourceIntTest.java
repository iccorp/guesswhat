package fr.iccorp.guesswhat.web.rest;

import fr.iccorp.guesswhat.GuesswhatApp;

import fr.iccorp.guesswhat.domain.Award;
import fr.iccorp.guesswhat.repository.AwardRepository;
import fr.iccorp.guesswhat.service.AwardService;
import fr.iccorp.guesswhat.service.dto.AwardDTO;
import fr.iccorp.guesswhat.service.mapper.AwardMapper;
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
import org.springframework.util.Base64Utils;

import javax.persistence.EntityManager;
import java.util.List;

import static fr.iccorp.guesswhat.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import fr.iccorp.guesswhat.domain.enumeration.AwardType;
/**
 * Test class for the AwardResource REST controller.
 *
 * @see AwardResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GuesswhatApp.class)
public class AwardResourceIntTest {

    private static final AwardType DEFAULT_TYPE = AwardType.TEXT;
    private static final AwardType UPDATED_TYPE = AwardType.IMAGE;

    private static final String DEFAULT_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_VALUE = "BBBBBBBBBB";

    private static final byte[] DEFAULT_IMAGE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMAGE = TestUtil.createByteArray(2, "1");
    private static final String DEFAULT_IMAGE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMAGE_CONTENT_TYPE = "image/png";

    @Autowired
    private AwardRepository awardRepository;

    @Autowired
    private AwardMapper awardMapper;

    @Autowired
    private AwardService awardService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAwardMockMvc;

    private Award award;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AwardResource awardResource = new AwardResource(awardService);
        this.restAwardMockMvc = MockMvcBuilders.standaloneSetup(awardResource)
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
    public static Award createEntity(EntityManager em) {
        Award award = new Award()
            .type(DEFAULT_TYPE)
            .value(DEFAULT_VALUE)
            .image(DEFAULT_IMAGE)
            .imageContentType(DEFAULT_IMAGE_CONTENT_TYPE);
        return award;
    }

    @Before
    public void initTest() {
        award = createEntity(em);
    }

    @Test
    @Transactional
    public void createAward() throws Exception {
        int databaseSizeBeforeCreate = awardRepository.findAll().size();

        // Create the Award
        AwardDTO awardDTO = awardMapper.toDto(award);
        restAwardMockMvc.perform(post("/api/awards")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(awardDTO)))
            .andExpect(status().isCreated());

        // Validate the Award in the database
        List<Award> awardList = awardRepository.findAll();
        assertThat(awardList).hasSize(databaseSizeBeforeCreate + 1);
        Award testAward = awardList.get(awardList.size() - 1);
        assertThat(testAward.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testAward.getValue()).isEqualTo(DEFAULT_VALUE);
        assertThat(testAward.getImage()).isEqualTo(DEFAULT_IMAGE);
        assertThat(testAward.getImageContentType()).isEqualTo(DEFAULT_IMAGE_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void createAwardWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = awardRepository.findAll().size();

        // Create the Award with an existing ID
        award.setId(1L);
        AwardDTO awardDTO = awardMapper.toDto(award);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAwardMockMvc.perform(post("/api/awards")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(awardDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Award in the database
        List<Award> awardList = awardRepository.findAll();
        assertThat(awardList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAwards() throws Exception {
        // Initialize the database
        awardRepository.saveAndFlush(award);

        // Get all the awardList
        restAwardMockMvc.perform(get("/api/awards?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(award.getId().intValue())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE.toString())))
            .andExpect(jsonPath("$.[*].imageContentType").value(hasItem(DEFAULT_IMAGE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].image").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGE))));
    }

    @Test
    @Transactional
    public void getAward() throws Exception {
        // Initialize the database
        awardRepository.saveAndFlush(award);

        // Get the award
        restAwardMockMvc.perform(get("/api/awards/{id}", award.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(award.getId().intValue()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE.toString()))
            .andExpect(jsonPath("$.imageContentType").value(DEFAULT_IMAGE_CONTENT_TYPE))
            .andExpect(jsonPath("$.image").value(Base64Utils.encodeToString(DEFAULT_IMAGE)));
    }

    @Test
    @Transactional
    public void getNonExistingAward() throws Exception {
        // Get the award
        restAwardMockMvc.perform(get("/api/awards/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAward() throws Exception {
        // Initialize the database
        awardRepository.saveAndFlush(award);
        int databaseSizeBeforeUpdate = awardRepository.findAll().size();

        // Update the award
        Award updatedAward = awardRepository.findOne(award.getId());
        // Disconnect from session so that the updates on updatedAward are not directly saved in db
        em.detach(updatedAward);
        updatedAward
            .type(UPDATED_TYPE)
            .value(UPDATED_VALUE)
            .image(UPDATED_IMAGE)
            .imageContentType(UPDATED_IMAGE_CONTENT_TYPE);
        AwardDTO awardDTO = awardMapper.toDto(updatedAward);

        restAwardMockMvc.perform(put("/api/awards")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(awardDTO)))
            .andExpect(status().isOk());

        // Validate the Award in the database
        List<Award> awardList = awardRepository.findAll();
        assertThat(awardList).hasSize(databaseSizeBeforeUpdate);
        Award testAward = awardList.get(awardList.size() - 1);
        assertThat(testAward.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testAward.getValue()).isEqualTo(UPDATED_VALUE);
        assertThat(testAward.getImage()).isEqualTo(UPDATED_IMAGE);
        assertThat(testAward.getImageContentType()).isEqualTo(UPDATED_IMAGE_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingAward() throws Exception {
        int databaseSizeBeforeUpdate = awardRepository.findAll().size();

        // Create the Award
        AwardDTO awardDTO = awardMapper.toDto(award);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAwardMockMvc.perform(put("/api/awards")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(awardDTO)))
            .andExpect(status().isCreated());

        // Validate the Award in the database
        List<Award> awardList = awardRepository.findAll();
        assertThat(awardList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAward() throws Exception {
        // Initialize the database
        awardRepository.saveAndFlush(award);
        int databaseSizeBeforeDelete = awardRepository.findAll().size();

        // Get the award
        restAwardMockMvc.perform(delete("/api/awards/{id}", award.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Award> awardList = awardRepository.findAll();
        assertThat(awardList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Award.class);
        Award award1 = new Award();
        award1.setId(1L);
        Award award2 = new Award();
        award2.setId(award1.getId());
        assertThat(award1).isEqualTo(award2);
        award2.setId(2L);
        assertThat(award1).isNotEqualTo(award2);
        award1.setId(null);
        assertThat(award1).isNotEqualTo(award2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(AwardDTO.class);
        AwardDTO awardDTO1 = new AwardDTO();
        awardDTO1.setId(1L);
        AwardDTO awardDTO2 = new AwardDTO();
        assertThat(awardDTO1).isNotEqualTo(awardDTO2);
        awardDTO2.setId(awardDTO1.getId());
        assertThat(awardDTO1).isEqualTo(awardDTO2);
        awardDTO2.setId(2L);
        assertThat(awardDTO1).isNotEqualTo(awardDTO2);
        awardDTO1.setId(null);
        assertThat(awardDTO1).isNotEqualTo(awardDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(awardMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(awardMapper.fromId(null)).isNull();
    }
}
