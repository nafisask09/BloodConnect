package com.bloodconnect.backend.controller;

import com.bloodconnect.backend.model.Donor;
import com.bloodconnect.backend.service.DonorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/donors")
@CrossOrigin(origins = "*")
public class DonorController {

    private final DonorService donorService;

    public DonorController(DonorService donorService) {
        this.donorService = donorService;
    }

    @PostMapping
    public ResponseEntity<?> addDonor(@RequestBody Donor donor) {

        // Name validation
        if (donor.getName() == null ||
                donor.getName().isBlank()) {

            return ResponseEntity.badRequest()
                    .body("Name is required.");
        }

        if (!donor.getName().matches("[a-zA-Z ]+")) {

            return ResponseEntity.badRequest()
                    .body("Name must contain only letters and spaces.");
        }

        // Age validation
        if (donor.getAge() < 18 ||
                donor.getAge() > 65) {

            return ResponseEntity.badRequest()
                    .body("Donor age must be between 18 and 65.");
        }

        // Blood group validation
        if (donor.getBloodGroup() == null ||
                donor.getBloodGroup().isBlank()) {

            return ResponseEntity.badRequest()
                    .body("Blood group is required.");
        }

        String bloodGroup = donor.getBloodGroup().toUpperCase();

        if (!bloodGroup.matches("^(A|B|AB|O)[+-]$")) {

            return ResponseEntity.badRequest()
                    .body("Invalid blood group.");
        }

        donor.setBloodGroup(bloodGroup);

        // Phone validation
        if (donor.getPhone() == null ||
                !donor.getPhone().matches("\\d{10}")) {

            return ResponseEntity.badRequest()
                    .body("Phone number must contain exactly 10 digits.");
        }

        // Location validation
        if (donor.getLocation() == null ||
                donor.getLocation().isBlank()) {

            return ResponseEntity.badRequest()
                    .body("Location is required.");
        }

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(donorService.addDonor(donor));
    }

    @GetMapping
    public List<Donor> getAllDonors() {
        return donorService.getAllDonors();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Donor> getDonorById(
            @PathVariable String id) {

        return donorService.getDonorById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateDonor(
            @PathVariable String id,
            @RequestBody Donor donor) {

        // Check if donor exists
        if (donorService.getDonorById(id).isEmpty()) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Donor not found.");
        }

        // Name validation
        if (donor.getName() == null ||
                donor.getName().isBlank()) {

            return ResponseEntity.badRequest()
                    .body("Name is required.");
        }

        if (!donor.getName().matches("[a-zA-Z ]+")) {

            return ResponseEntity.badRequest()
                    .body("Name must contain only letters and spaces.");
        }

        // Age validation
        if (donor.getAge() < 18 ||
                donor.getAge() > 65) {

            return ResponseEntity.badRequest()
                    .body("Donor age must be between 18 and 65.");
        }

        // Blood group validation
        if (donor.getBloodGroup() == null ||
                donor.getBloodGroup().isBlank()) {

            return ResponseEntity.badRequest()
                    .body("Blood group is required.");
        }

        String bloodGroup = donor.getBloodGroup().toUpperCase();

        if (!bloodGroup.matches("^(A|B|AB|O)[+-]$")) {

            return ResponseEntity.badRequest()
                    .body("Invalid blood group.");
        }

        donor.setBloodGroup(bloodGroup);

        // Phone validation
        if (donor.getPhone() == null ||
                !donor.getPhone().matches("\\d{10}")) {

            return ResponseEntity.badRequest()
                    .body("Phone number must contain exactly 10 digits.");
        }

        // Location validation
        if (donor.getLocation() == null ||
                donor.getLocation().isBlank()) {

            return ResponseEntity.badRequest()
                    .body("Location is required.");
        }

        return ResponseEntity.ok(
                donorService.updateDonor(id, donor)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDonor(
            @PathVariable String id) {

        if (donorService.getDonorById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        donorService.deleteDonor(id);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public List<Donor> searchDonors(
            @RequestParam String bloodGroup,
            @RequestParam(required = false) String location) {

        if (location == null || location.isBlank()) {

            return donorService.searchByBloodGroup(bloodGroup);
        }

        return donorService.searchByBloodGroupAndLocation(
                bloodGroup,
                location
        );
    }

    @GetMapping("/locations")
    public List<String> getLocations(
            @RequestParam String query) {

        return donorService.getLocationSuggestions(query);
    }
}