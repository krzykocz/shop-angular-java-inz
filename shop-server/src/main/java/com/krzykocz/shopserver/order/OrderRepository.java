package com.krzykocz.shopserver.order;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface OrderRepository extends JpaRepository<OrderEntity, Long> {

    Page<OrderEntity> findAllByUserUsername(String username, Pageable pageable);

    OrderEntity findByIdAndUserUsername(Long id, String username);

    Page<OrderEntity> findAllBySellerUsername(String username, Pageable pageable);

    Page<OrderEntity> findAllBySellerIsNull(Pageable pageable);
}
