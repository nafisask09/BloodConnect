package com.bloodconnect.backend.service;

import com.bloodconnect.backend.model.Donor;
import com.bloodconnect.backend.repository.DonorRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DonorService {

    private final DonorRepository donorRepository;

    public DonorService(DonorRepository donorRepository) {
        this.donorRepository = donorRepository;
    }

    public Donor addDonor(Donor donor) {
        return donorRepository.save(donor);
    }

    public List<Donor> getAllDonors() {
        return donorRepository.findAll();
    }

    public Optional<Donor> getDonorById(String id) {
        return donorRepository.findById(id);
    }

    public Donor updateDonor(String id, Donor donor) {

        Donor existingDonor = donorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Donor not found"));

        existingDonor.setName(donor.getName());
        existingDonor.setAge(donor.getAge());
        existingDonor.setBloodGroup(donor.getBloodGroup());
        existingDonor.setPhone(donor.getPhone());
        existingDonor.setLocation(donor.getLocation());
        existingDonor.setAvailability(donor.isAvailability());
        existingDonor.setLastDonationDate(donor.getLastDonationDate());

        return donorRepository.save(existingDonor);
    }

    public void deleteDonor(String id) {
        donorRepository.deleteById(id);
    }

    public List<Donor> searchByBloodGroup(String bloodGroup) {

        return donorRepository
                .findByBloodGroupIgnoreCaseAndAvailabilityTrue(bloodGroup);
    }

    public List<Donor> searchByBloodGroupAndLocation(
            String bloodGroup,
            String location) {

        return donorRepository
                .findByBloodGroupIgnoreCaseAndLocationIgnoreCaseAndAvailabilityTrue(
                        bloodGroup,
                        location
                );
    }

    public List<String> getLocationSuggestions(String location) {

        return donorRepository
                .findByLocationContainingIgnoreCase(location)
                .stream()
                .map(Donor::getLocation)
                .distinct()
                .sorted()
                .collect(Collectors.toList());
    }
}