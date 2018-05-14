package fr.iccorp.guesswhat.repository;

import fr.iccorp.guesswhat.domain.Clue;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Clue entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ClueRepository extends JpaRepository<Clue, Long> {

}
