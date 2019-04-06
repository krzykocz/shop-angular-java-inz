package com.krzykocz.shopserver.manufacturer;

import com.krzykocz.shopserver.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
public class ManufacturerController {

    @Autowired
    private ManufacturerRepository manufacturerRepository;

    @GetMapping("/manufacturer")
    public Collection<ManufacturerEntity> getAll() {
        return manufacturerRepository.findAll().stream().collect(Collectors.toList());
    }

    @PostMapping("/manufacturer")
    public ResponseEntity createManufacturer(@RequestBody ManufacturerEntity manufacturer) {
        try {
            ManufacturerEntity newManufacturer = new ManufacturerEntity();
            newManufacturer.setName(manufacturer.getName());
            return ResponseEntity.status(HttpStatus.CREATED).body(manufacturerRepository.save(newManufacturer));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }

    @GetMapping("/manufacturer/{id}")
    public ManufacturerEntity getManufacturerById(@PathVariable Long id) {
        return manufacturerRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Manufacturer not found!"));
    }

    @PutMapping("/manufacturer/{id}")
    public ResponseEntity updateManufacturer(@PathVariable Long id, @RequestBody ManufacturerEntity manufacturerDetails) {
        ManufacturerEntity manufacturer = manufacturerRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Manufacturer not found!"));
        manufacturer.setName(manufacturerDetails.getName());
        return ResponseEntity.status(HttpStatus.OK).body(manufacturerRepository.save(manufacturer));
    }
}
