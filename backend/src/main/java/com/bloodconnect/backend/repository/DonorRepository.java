package com.bloodconnect.backend.repository;

import com.bloodconnect.backend.model.Donor;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface DonorRepository extends MongoRepository<Donor, String> {

    // Search by blood group only
    List<Donor> findByBloodGroupIgnoreCaseAndAvailabilityTrue(String bloodGroup);

    // Location suggestions
    List<Donor> findByLocationContainingIgnoreCase(String location);
}