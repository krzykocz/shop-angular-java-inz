package com.krzykocz.shopserver.message;

import com.krzykocz.shopserver.enums.UserRoleEnum;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface MessageRepository extends JpaRepository<MessageEntity, Long> {
    Page<MessageEntity> findAllByOrderId(Long orderId, Pageable pageable);

    List<MessageEntity> findAllByReadedIsFalseAndUserRole(UserRoleEnum role);

    List<MessageEntity> findAllByReadedIsFalseAndOrderIdAndUserId(Long orderId, Long userId);
}
