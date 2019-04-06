package com.krzykocz.shopserver.manufacturer;

import com.krzykocz.shopserver.AuditEntity;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.*;

@Entity
@Table(name = "manufacturer", schema = "public")
@Data
@NoArgsConstructor
public class ManufacturerEntity extends AuditEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private @NonNull
    String name;
}
