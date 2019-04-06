package com.krzykocz.shopserver.product;

import com.krzykocz.shopserver.AuditEntity;
import com.krzykocz.shopserver.category.CategoryEntity;
import com.krzykocz.shopserver.manufacturer.ManufacturerEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.*;
import javax.validation.constraints.Digits;
import java.math.BigDecimal;

@Entity
@Table(name = "product", schema = "public")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductEntity extends AuditEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private @NonNull String name;

    @Digits(integer = 10, fraction = 2)
    private @NonNull BigDecimal price;

    private @NonNull Short count;

    private @NonNull String description;

    private String image;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    private CategoryEntity category;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "manufacturer_id", nullable = false)
    private ManufacturerEntity manufacturer;

}