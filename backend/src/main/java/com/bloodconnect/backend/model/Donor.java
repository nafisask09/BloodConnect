package com.bloodconnect.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "donors")
public class Donor {

    @Id
    private String id;

    private String name;
    private int age;
    private String bloodGroup;
    private String phone;
    private String location;
    private boolean availability;
    private String lastDonationDate;

    public Donor() {
    }

    public Donor(String name, int age, String bloodGroup, String phone,
                 String location, boolean availability, String lastDonationDate) {
        this.name = name;
        this.age = age;
        this.bloodGroup = bloodGroup;
        this.phone = phone;
        this.location = location;
        this.availability = availability;
        this.lastDonationDate = lastDonationDate;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getBloodGroup() {
        return bloodGroup;
    }

    public void setBloodGroup(String bloodGroup) {
        this.bloodGroup = bloodGroup;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public boolean isAvailability() {
        return availability;
    }

    public void setAvailability(boolean availability) {
        this.availability = availability;
    }

    public String getLastDonationDate() {
        return lastDonationDate;
    }

    public void setLastDonationDate(String lastDonationDate) {
        this.lastDonationDate = lastDonationDate;
    }
}