package Reto2_web.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Reto2_web.model.Fragance;
import Reto2_web.repository.FraganceRepository;

@Service
public class FraganceService {

    @Autowired
    private FraganceRepository fraganceRepository;

    public List<Fragance> getAll() {
        return fraganceRepository.getAll();
    }

    public Optional<Fragance> getFragance(String reference) {
        return fraganceRepository.getFragance(reference);
    }

    public Fragance create(Fragance fragance) {
        if (fragance.getReference() == null) {
            return fragance;
        } else {
            return fraganceRepository.create(fragance);
        }
    }

    public Fragance update(Fragance fragance) {

        if (fragance.getReference() != null) {
            Optional<Fragance> accesoryDb = fraganceRepository.getFragance(fragance.getReference());
            if (!accesoryDb.isEmpty()) {

                if (fragance.getBrand() != null) {
                    accesoryDb.get().setBrand(fragance.getBrand());
                }

                if (fragance.getCategory() != null) {
                    accesoryDb.get().setCategory(fragance.getCategory());
                }

                if (fragance.getPresentation() != null) {
                    accesoryDb.get().setPresentation(fragance.getPresentation());
                }

                if (fragance.getDescription() != null) {
                    accesoryDb.get().setDescription(fragance.getDescription());
                }
                if (fragance.getPrice() != 0.0) {
                    accesoryDb.get().setPrice(fragance.getPrice());
                }
                if (fragance.getQuantity() != 0) {
                    accesoryDb.get().setQuantity(fragance.getQuantity());
                }
                if (fragance.getPhotography() != null) {
                    accesoryDb.get().setPhotography(fragance.getPhotography());
                }
                accesoryDb.get().setAvailability(fragance.isAvailability());
                fraganceRepository.update(accesoryDb.get());
                return accesoryDb.get();
            } else {
                return fragance;
            }
        } else {
            return fragance;
        }
    }

    public boolean delete(String reference) {
        Boolean aBoolean = getFragance(reference).map(accesory -> {
            fraganceRepository.delete(accesory);
            return true;
        }).orElse(false);
        return aBoolean;
    }

}
