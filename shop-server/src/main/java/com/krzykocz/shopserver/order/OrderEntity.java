package com.krzykocz.shopserver.order;

import com.krzykocz.shopserver.AuditEntity;
import com.krzykocz.shopserver.user.UserEntity;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity
@Table(name = "order", schema = "public")
@Data
@NoArgsConstructor
public class OrderEntity extends AuditEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "payment_method")
    @Size(max = 100)
    private String paymentMethod;

    @Column(name = "payment_status")
    @Size(max = 100)
    private String paymentStatus;

    @Column(name = "delivery_method")
    @Size(max = 100)
    private String deliveryMethod;

    @Column(name = "completed")
    private boolean completed;

    @Column(name = "status")
    @Size(max = 255)
    private String status;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "seller_id", nullable = true)
    private UserEntity seller;
}