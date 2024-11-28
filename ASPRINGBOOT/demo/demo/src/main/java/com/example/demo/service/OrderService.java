package com.example.demo.service;

import com.example.demo.dto.OrderDTO;
import com.example.demo.entity.Order;
import com.example.demo.entity.OrderItem;
import com.example.demo.entity.Product;
import com.example.demo.entity.User;
import com.example.demo.exception.BadRequestException;
import com.example.demo.exception.NotFoundException;
import com.example.demo.helper.UserHelper;
import com.example.demo.mapper.OrderMapper;
import com.example.demo.repository.OrderRepository;
import com.example.demo.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserHelper userHelper;

    @Autowired
    private OrderMapper orderMapper;

    @Transactional
    public OrderDTO createOrder(OrderDTO orderDTO) {
        User user = userHelper.getUserProfile();

        // Lấy thông tin sản phẩm và ánh xạ sang OrderItem
        List<OrderItem> orderItems = orderDTO.getItems().stream()
                .map(itemDTO -> {
                    Product product = productRepository.findById(itemDTO.getProductId())
                            .orElseThrow(() -> new BadRequestException("Product not found"));

                    // Kiểm tra số lượng trong kho
                    if (product.getQuantity() < itemDTO.getQuantity()) {
                        throw new BadRequestException("Insufficient product quantity for: " + product.getName());
                    }

                    // Trừ số lượng sản phẩm trong kho
                    product.setQuantity(product.getQuantity() - itemDTO.getQuantity());
                    productRepository.save(product); // Cập nhật số lượng sản phẩm trong DB

                    OrderItem orderItem = new OrderItem();
                    orderItem.setProduct(product);
                    orderItem.setQuantity(itemDTO.getQuantity());
                    orderItem.setTotalPrice(product.getPrice() * itemDTO.getQuantity());
                    return orderItem;
                })
                .collect(Collectors.toList());

        double totalPrice = orderItems.stream().mapToDouble(OrderItem::getTotalPrice).sum();

        // Ánh xạ DTO sang Entity
        Order order = orderMapper.toOrder(orderDTO);
        order.setUser(user);
        order.setItems(orderItems);
        order.setTotalPrice(totalPrice);

        // Lưu và ánh xạ ngược lại sang DTO
        Order savedOrder = orderRepository.save(order);
        return orderMapper.toOrderDTO(savedOrder);
    }

    public OrderDTO updateOrderStatus(Long orderId, int status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new NotFoundException("Order not found"));

        order.setStatus(status);
        Order updatedOrder = orderRepository.save(order);
        return orderMapper.toOrderDTO(updatedOrder);
    }

    public void deleteOrder(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new NotFoundException("Order not found"));

        orderRepository.delete(order);
    }

    public List<OrderDTO> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        return orderMapper.toOrderDTOs(orders);
    }

    public OrderDTO getOrderById(Long orderId) {
        // Tìm đơn hàng theo ID
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new NotFoundException("Order not found"));

        // Ánh xạ entity sang DTO
        return orderMapper.toOrderDTO(order);
    }

}
