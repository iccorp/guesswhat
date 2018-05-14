package fr.iccorp.guesswhat.repository;

import fr.iccorp.guesswhat.domain.Attempt;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the Attempt entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AttemptRepository extends JpaRepository<Attempt, Long> {

    @Query("select attempt from Attempt attempt where attempt.user.login = ?#{principal.username}")
    List<Attempt> findByUserIsCurrentUser();

}
