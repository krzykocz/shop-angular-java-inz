package com.krzykocz.shopserver.order;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderForm {
    String paymentMethod;
    String paymentStatus;
    String deliveryMethod;
    OrderItemEntity[] items;
}
