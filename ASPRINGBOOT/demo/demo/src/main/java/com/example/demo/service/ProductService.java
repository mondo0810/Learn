package com.example.demo.service;

import com.example.demo.dto.response.ProductRes;
import com.example.demo.entity.Product;
import com.example.demo.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Page<ProductRes> searchFilterAndSortProducts(
            String keyword,
            Double minPrice,
            Double maxPrice,
            Integer minQuantity,
            int page,
            int size,
            String sortBy,
            String sortDir
    ) {
        Sort sort = sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Product> productPage = productRepository.searchFilterAndSortProducts(keyword, minPrice, maxPrice, minQuantity, pageable);

        return productPage.map(product -> {
            ProductRes productRes = new ProductRes();
            productRes.setId(product.getId());
            productRes.setName(product.getName());
            productRes.setPrice(product.getPrice());
            productRes.setQuantity(product.getQuantity());
            productRes.setStatus(product.getQuantity() > 0 ? "Còn Hàng" : "Hết Hàng");
            return productRes;
        });
    }


    public Product createProduct(Product product) {
        return productRepository.save(product);
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
