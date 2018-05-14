package fr.iccorp.guesswhat.repository;

import fr.iccorp.guesswhat.domain.Challenge;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Challenge entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ChallengeRepository extends JpaRepository<Challenge, Long> {

    @Query("select challenge from Challenge challenge where challenge.user.login = ?#{principal.username}")
    List<Challenge> findByUserIsCurrentUser();
    @Query("select distinct challenge from Challenge challenge left join fetch challenge.categories")
    List<Challenge> findAllWithEagerRelationships();

    @Query("select challenge from Challenge challenge left join fetch challenge.categories where challenge.id =:id")
    Challenge findOneWithEagerRelationships(@Param("id") Long id);

}
