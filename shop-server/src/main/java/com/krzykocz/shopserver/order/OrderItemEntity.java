package com.krzykocz.shopserver.order;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.krzykocz.shopserver.AuditEntity;
import com.krzykocz.shopserver.product.ProductEntity;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Digits;
import java.math.BigDecimal;

@Entity
@Table(name = "order_item", schema = "public")
@Data
@NoArgsConstructor
public class OrderItemEntity extends AuditEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Short count;

    @Digits(integer = 10, fraction = 2)
    private BigDecimal price;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "order_id", nullable = false)
    @JsonIgnore
    private OrderEntity order;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    private ProductEntity product;
}
