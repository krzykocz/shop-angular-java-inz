package com.krzykocz.shopserver.message;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.krzykocz.shopserver.AuditEntity;
import com.krzykocz.shopserver.order.OrderEntity;
import com.krzykocz.shopserver.user.UserEntity;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.*;

@Entity
@Table(name = "message", schema = "public")
@Data
@NoArgsConstructor
public class MessageEntity extends AuditEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    private String message;

    private boolean readed;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "order_id", nullable = false)
    @JsonIgnore
    private OrderEntity order;
}