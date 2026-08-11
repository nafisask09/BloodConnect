package com.bloodconnect.backend.repository;

import com.bloodconnect.backend.model.Donor;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface DonorRepository extends MongoRepository<Donor, String> {

    List<Donor> findByBloodGroupIgnoreCaseAndAvailabilityTrue(
            String bloodGroup);

    List<Donor> findByBloodGroupIgnoreCaseAndLocationIgnoreCaseAndAvailabilityTrue(
            String bloodGroup,
            String location);

    List<Donor> findByLocationContainingIgnoreCase(
            String location);
}