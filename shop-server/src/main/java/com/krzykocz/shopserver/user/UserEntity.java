package com.krzykocz.shopserver.user;

import com.krzykocz.shopserver.AuditEntity;
import com.krzykocz.shopserver.enums.UserRoleEnum;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity
@Table(name = "user", schema = "public")
@Data
@NoArgsConstructor
public class UserEntity extends AuditEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    @Size(max = 100)
    @Column(name = "login", unique = true)
    private String username;

    @NonNull
    @Size(max = 255)
    @Column
    private String password;

    @NonNull
    @Size(max = 50)
    @Column(unique = true)
    private String email;

    @NonNull
    @Size(max = 30)
    @Column
    private String firstname;

    @NonNull
    @Size(max = 30)
    @Column
    private String lastname;

    @NonNull
    @Column
    @Enumerated(EnumType.STRING)
    private UserRoleEnum role = UserRoleEnum.CUSTOMER;

    @Size(max = 30)
    @Column
    private String city;

    @Size(max = 20)
    @Column
    private String voivodeship;

    @Size(max = 6)
    @Column(name = "postal_code")
    private String postalCode;

    @Size(max = 30)
    private String street;

    @Size(max = 10)
    @Column(name = "house_nr")
    private String houseNr;

    @Size(max = 15)
    private String phone;
}