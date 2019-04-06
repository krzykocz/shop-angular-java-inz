package com.krzykocz.shopserver.category;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.krzykocz.shopserver.AuditEntity;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "category", schema = "public")
@Data
@NoArgsConstructor
public class CategoryEntity extends AuditEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private @NonNull String name;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "parent_id")
    @JsonIgnore
    private CategoryEntity parentCategory;

    @OneToMany(
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            mappedBy = "parentCategory")
    private List<CategoryEntity> subCategory;


}
