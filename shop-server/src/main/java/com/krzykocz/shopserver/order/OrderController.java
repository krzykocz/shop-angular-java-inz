package com.krzykocz.shopserver.order;

import com.krzykocz.shopserver.enums.UserRoleEnum;
import com.krzykocz.shopserver.exception.ResourceNotFoundException;
import com.krzykocz.shopserver.form.IdsForm;
import com.krzykocz.shopserver.product.ProductEntity;
import com.krzykocz.shopserver.product.ProductRepository;
import com.krzykocz.shopserver.user.UserEntity;
import com.krzykocz.shopserver.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/order")
    public Page<OrderEntity> getAll(Pageable pageable) {
        return orderRepository.findAll(pageable);
    }

    @GetMapping("/order/{orderId}")
    public OrderEntity getOrderById(@PathVariable Long orderId) {
        return orderRepository.findById(orderId).orElseThrow(() -> new ResourceNotFoundException("Order not found!"));
    }

    @GetMapping("/order/seller/{username}")
    public Page<OrderEntity> getBySellerId(@PathVariable String username, Pageable pageable) {
        if (!username.equals("null")) {
            return orderRepository.findAllBySellerUsername(username, pageable);
        } else {
            return orderRepository.findAllBySellerIsNull(pageable);
        }
    }

    @GetMapping("/user/order")
    public Page<OrderEntity> getAllUserOrders(Pageable pageable, Principal principal) {
        return orderRepository.findAllByUserUsername(principal.getName(), pageable);
    }

    @GetMapping("/user/order/{orderId}")
    public OrderEntity getUserOrderById(@PathVariable Long orderId, Principal principal) {
        try {
            return orderRepository.findByIdAndUserUsername(orderId, principal.getName());
        } catch (Exception ex) {
            throw new ResourceNotFoundException("Order with id: " + orderId + ", doesn't exist for current user");
        }
    }

    @GetMapping("/order/{orderId}/details")
    public List<OrderItemEntity> getOrderDetails(@PathVariable Long orderId) {
        return orderItemRepository.findAllByOrderId(orderId);
    }

    @GetMapping("/order/seller/count")
    public List<SellerStatisticForm> getCountOrdersBySellerIdAndCompletedIsFalse() {
        List<UserEntity> users = userRepository.findAllByRole(UserRoleEnum.SELLER);
        List<SellerStatisticForm> sellersStatistic = new ArrayList<>();
        for (UserEntity user : users) {
            Integer count = orderRepository.countAllBySellerId(user.getId());
            sellersStatistic.add(new SellerStatisticForm(user, count));
        }
        return sellersStatistic;
    }

    @PostMapping("/order/create")
    public ResponseEntity<?> create(@RequestBody OrderForm orderForm, Principal principal) {
        System.out.println(orderForm.getPaymentMethod());
        System.out.println(orderForm.getItems().length);
        try {
            OrderEntity newOrder = new OrderEntity();
            newOrder.setPaymentMethod(orderForm.getPaymentMethod());
            newOrder.setUser(userRepository.findByUsername(principal.getName()));
            newOrder.setPaymentStatus(orderForm.getPaymentStatus());
            newOrder.setDeliveryMethod(orderForm.getDeliveryMethod());
            newOrder.setCompleted(false);
            newOrder.setStatus("W trakcie realizacji");
            newOrder = orderRepository.saveAndFlush(newOrder);
            for (OrderItemEntity item : orderForm.getItems()) {
                ProductEntity product = productRepository.findById(item.getProduct().getId()).orElseThrow(ResourceNotFoundException::new);
                OrderItemEntity newItem = new OrderItemEntity();
                newItem.setCount(item.getCount());
                newItem.setPrice(product.getPrice());
                newItem.setProduct(product);
                newItem.setOrder(newOrder);
                orderItemRepository.save(newItem);
                product.setCount((short) (product.getCount() - item.getCount()));
                productRepository.save(product);
            }
            return ResponseEntity.status(HttpStatus.CREATED).body(newOrder);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }

    }

    @PutMapping("/order/{orderId}")
    public ResponseEntity<?> updateOrder(@PathVariable Long orderId, @RequestBody OrderEntity oldOrder) {
        try {
            OrderEntity updatedOrder = orderRepository.findById(orderId).orElseThrow(() -> new ResourceNotFoundException("Order not found"));
            updatedOrder.setStatus(oldOrder.getStatus());
            updatedOrder.setSeller(userRepository.findById(oldOrder.getSeller().getId()).orElseThrow(() -> new ResourceNotFoundException("Seller not found!")));
            updatedOrder.setCompleted(oldOrder.isCompleted());
            return ResponseEntity.status(HttpStatus.OK).body(orderRepository.saveAndFlush(updatedOrder));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }

    @PutMapping("/order/assign/{sellerID}/{orderID}")
    public ResponseEntity<?> assignOrderToSeller(@PathVariable Long sellerID, @PathVariable Long orderID) {
        try {
            OrderEntity updatedOrder = orderRepository.findById(orderID).orElseThrow(() -> new ResourceNotFoundException("Order not found"));
            updatedOrder.setSeller(userRepository.findById(sellerID).orElseThrow(() -> new ResourceNotFoundException("Seller not found!")));
            return ResponseEntity.status(HttpStatus.OK).body(orderRepository.saveAndFlush(updatedOrder));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }

    @PutMapping("/order/assign/{sellerID}")
    public ResponseEntity<?> assignOrdersToSeller(@PathVariable Long sellerID, @RequestBody IdsForm idsForm) {
        for (Long id : idsForm.getIds()) {
            OrderEntity order = orderRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Order not found"));
            order.setSeller(userRepository.findById(sellerID).orElseThrow(() -> new ResourceNotFoundException("Seller not found")));
            orderRepository.save(order);
        }
        return ResponseEntity.status(HttpStatus.OK).body("Orders assigned");
    }

    @PutMapping("/order/{orderId}/complaint")
    public ResponseEntity<?> complaintOrder(@PathVariable Long orderId, @RequestBody OrderEntity oldOrder) {
        try {
            OrderEntity updatedOrder = orderRepository.findById(orderId).orElseThrow(() -> new ResourceNotFoundException("Order not found"));
            updatedOrder.setStatus("Zgłoszono reklamację");
            updatedOrder.setComplaint(true);
            updatedOrder.setComplaintDescription(oldOrder.getComplaintDescription());
            updatedOrder.setComplaintDate(new Date());
            updatedOrder.setCompleted(false);
            return ResponseEntity.status(HttpStatus.OK).body(orderRepository.saveAndFlush(updatedOrder));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }
}
