package com.krzykocz.shopserver.product;

import com.krzykocz.shopserver.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/product")
    public Page<ProductEntity> getAll(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    @GetMapping("/product/{id}")
    public ProductEntity getProductById(@PathVariable Long id) {
        return productRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Product not found!"));
    }

    @GetMapping("/product/search")
    public Page<ProductEntity> searchProduct(@RequestParam("q") String query, Pageable pageable) {
        return productRepository.findAllByNameContainingIgnoreCase(query, pageable);
    }

    @GetMapping("/category/{categoryId}/products")
    public Page<ProductEntity> getProductsByCategory(@PathVariable Long categoryId, Pageable pageable) {
        return productRepository.findAllByCategoryId(categoryId, pageable);
    }

    @PostMapping("/product")
    public ResponseEntity<?> create(@RequestBody ProductEntity product) {
        try {
            ProductEntity newProduct = new ProductEntity();
            newProduct.setName(product.getName());
            newProduct.setPrice(product.getPrice());
            newProduct.setCount(product.getCount());
            newProduct.setDescription(product.getDescription());
            newProduct.setImage(product.getImage());
            newProduct.setCategory(product.getCategory());
            newProduct.setManufacturer(product.getManufacturer());
            return ResponseEntity.status(HttpStatus.CREATED).body(productRepository.save(newProduct));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }

    @PutMapping("/product/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Long id, @RequestBody ProductEntity productDetails) {

        ProductEntity product = productRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Product not found!"));

        product.setName(productDetails.getName());
        product.setPrice(productDetails.getPrice());
        product.setCount(productDetails.getCount());
        product.setDescription(productDetails.getDescription());
        product.setImage(productDetails.getImage());
        product.setCategory(productDetails.getCategory());
        product.setManufacturer(productDetails.getManufacturer());

        return ResponseEntity.status(HttpStatus.OK).body(productRepository.save(product));
    }
}
