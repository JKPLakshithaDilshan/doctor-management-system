package com.example.doctormanagement.controller;

import com.example.doctormanagement.model.Doctor;
import com.example.doctormanagement.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin(origins = "*")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @PostMapping
    public void addDoctor(@RequestBody Doctor doctor) {
        doctorService.addDoctor(doctor);
    }

    @GetMapping
    public List<Doctor> getAllDoctors() {
        return doctorService.getAllDoctors();
    }

    @PutMapping("/{id}")
    public void updateDoctor(@PathVariable String id, @RequestBody Doctor doctor) {
        doctorService.updateDoctor(id, doctor);
    }

    @DeleteMapping("/{id}")
    public void deleteDoctor(@PathVariable String id) {
        doctorService.deleteDoctor(id);
    }

    @GetMapping("/search")
    public List<Doctor> searchDoctors(@RequestParam String query) {
        return doctorService.searchDoctors(query);
    }

    @GetMapping("/count")
    public long getDoctorCount() {
        return doctorService.getDoctorCount();
    }
}

