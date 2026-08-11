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

    // FIXED - SIMPLE SEARCH METHODS
    public List<Donor> searchByBloodGroup(String bloodGroup) {
        System.out.println("Service: Searching for blood group: " + bloodGroup);
        List<Donor> results = donorRepository.findByBloodGroupIgnoreCaseAndAvailabilityTrue(bloodGroup);
        System.out.println("Service: Found " + results.size() + " donors");
        return results;
    }

    public List<Donor> searchByBloodGroupAndLocation(String bloodGroup, String location) {
        System.out.println("Service: Searching for blood group: " + bloodGroup + " in location: " + location);
        
        // Get ALL donors first (for debugging)
        List<Donor> allDonors = donorRepository.findAll();
        System.out.println("Total donors in DB: " + allDonors.size());
        
        // Manually filter (temporary fix)
        List<Donor> results = allDonors.stream()
                .filter(d -> d.getBloodGroup().equalsIgnoreCase(bloodGroup))
                .filter(d -> d.getLocation().equalsIgnoreCase(location))
                .filter(Donor::isAvailability)
                .collect(Collectors.toList());
        
        System.out.println("Filtered results: " + results.size());
        return results;
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