package com.krzykocz.shopserver.order;

import com.krzykocz.shopserver.user.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SellerStatisticForm {
    UserEntity seller;
    Integer assignedOrders;
}
