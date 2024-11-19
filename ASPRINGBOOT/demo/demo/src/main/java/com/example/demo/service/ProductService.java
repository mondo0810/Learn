package com.example.demo.service;

import com.example.demo.dto.response.ProductRes;
import com.example.demo.entity.Product;
import com.example.demo.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public List<ProductRes> getAllProducts() {
        List<Product> products = productRepository.findAll();
        List<ProductRes> productResList = new ArrayList<>();

        for (Product product : products) {
            ProductRes productRes = new ProductRes();
            productRes.setId(product.getId());
            productRes.setName(product.getName());
            productRes.setPrice(product.getPrice());
            productRes.setQuantity(product.getQuantity());
            productRes.setStatus(product.getQuantity() > 0 ? "Còn Hàng" : "Hết Hàng");
            productResList.add(productRes);
        }
        return productResList;
    }


    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public Product updateProduct(Long id, Product product) {
        if (productRepository.existsById(id)) {
            product.setId(id);
            return productRepository.save(product);
        }
        return null;
    }

    public boolean deleteProduct(Long id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
