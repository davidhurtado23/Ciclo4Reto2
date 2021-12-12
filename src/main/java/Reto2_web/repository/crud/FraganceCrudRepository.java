package Reto2_web.repository.crud;

import org.springframework.data.mongodb.repository.MongoRepository;

import Reto2_web.model.Fragance;

public interface FraganceCrudRepository extends MongoRepository<Fragance, String> {

}
