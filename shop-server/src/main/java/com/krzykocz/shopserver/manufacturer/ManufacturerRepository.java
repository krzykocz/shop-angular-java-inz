package com.krzykocz.shopserver.manufacturer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface ManufacturerRepository extends JpaRepository<ManufacturerEntity, Long> {
}
