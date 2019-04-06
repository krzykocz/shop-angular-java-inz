package com.krzykocz.shopserver.category;

import com.krzykocz.shopserver.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@CrossOrigin
public class CategoryController {

    @Autowired CategoryRepository categoryRepository;

    @GetMapping("/category")
    public Collection<CategoryEntity> getAll() {
        return categoryRepository.findAllByParentCategoryIsNull();
    }

    @GetMapping("/category/{id}")
    public CategoryEntity getCategoryById(@PathVariable Long id) {
        return categoryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Category not found!"));
    }

    @PostMapping("/category")
    public ResponseEntity<?> create(@RequestBody CategoryEntity categoryDetails) {
        try {
            CategoryEntity newCategory = new CategoryEntity();
            newCategory.setName(categoryDetails.getName());
            newCategory.setParentCategory(categoryDetails.getParentCategory());
            return ResponseEntity.status(HttpStatus.CREATED).body(categoryRepository.save(newCategory));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }

    @PutMapping("/category/{id}")
    public ResponseEntity update(@PathVariable Long id, @RequestBody CategoryEntity categoryDetails) {
        CategoryEntity category = categoryRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Category not found!"));
        category.setName(categoryDetails.getName());
        category.setParentCategory(categoryDetails.getParentCategory());
        return ResponseEntity.status(HttpStatus.OK).body(categoryRepository.save(category));
    }

}
