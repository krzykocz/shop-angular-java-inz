package com.krzykocz.shopserver.product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface ProductRepository extends JpaRepository<ProductEntity, Long> {

    Page<ProductEntity> findAllByCategoryId(Long categoryId, Pageable pageable);

    Page<ProductEntity> findAllByNameContainingIgnoreCase(String name, Pageable pageable);

    Page<ProductEntity> findAllByCountLessThanAndCountGreaterThan(Short count, Short greater, Pageable pageable);
}
