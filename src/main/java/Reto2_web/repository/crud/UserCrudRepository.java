package Reto2_web.repository.crud;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import Reto2_web.model.User;

public interface UserCrudRepository extends MongoRepository<User, Integer> {

    Optional<User> findByEmail(String email);

    Optional<User> findByEmailAndPassword(String email, String password);
}
