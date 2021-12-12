package Reto2_web.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import Reto2_web.model.Fragance;
import Reto2_web.repository.crud.FraganceCrudRepository;

@Repository
public class FraganceRepository {

    @Autowired
    private FraganceCrudRepository fraganceCrudRepository;

    public List<Fragance> getAll() {
        return fraganceCrudRepository.findAll();
    }

    public Optional<Fragance> getFragance(String reference) {
        return fraganceCrudRepository.findById(reference);
    }

    public Fragance create(Fragance fragance) {
        return fraganceCrudRepository.save(fragance);
    }

    public void update(Fragance fragance) {
        fraganceCrudRepository.save(fragance);
    }

    public void delete(Fragance fragance) {
        fraganceCrudRepository.delete(fragance);
    }

}
