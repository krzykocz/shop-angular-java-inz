package com.krzykocz.shopserver.message;

import com.krzykocz.shopserver.enums.UserRoleEnum;
import com.krzykocz.shopserver.exception.ResourceNotFoundException;
import com.krzykocz.shopserver.order.OrderRepository;
import com.krzykocz.shopserver.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin
public class MessageController {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/order/{orderId}/message")
    public Page<MessageEntity> getAllByOrderId(@PathVariable Long orderId, Pageable pageable) {
        return messageRepository.findAllByOrderId(orderId, pageable);
    }

    @PostMapping("/order/{orderId}/message")
    public ResponseEntity<?> create(@PathVariable Long orderId, @RequestBody MessageEntity message, Principal principal) {
        System.out.println(message);
        try {
            MessageEntity newMessage = new MessageEntity();
            newMessage.setMessage(message.getMessage());
            newMessage.setReaded(false);
            newMessage.setUser(userRepository.findByUsername(principal.getName()));
            newMessage.setOrder(orderRepository.findById(orderId).orElseThrow(() -> new ResourceNotFoundException("Order not found!")));
            return ResponseEntity.status(HttpStatus.CREATED).body(messageRepository.save(newMessage));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }

    @GetMapping("/message")
    public List<MessageEntity> getAllUnreadedUserMessages() {
        return messageRepository.findAllByReadedIsFalseAndUserRole(UserRoleEnum.CUSTOMER);
    }
}
