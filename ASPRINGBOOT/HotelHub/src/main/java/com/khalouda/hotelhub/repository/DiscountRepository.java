package com.khalouda.hotelhub.repository;

import com.khalouda.hotelhub.model.entity.Discount;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiscountRepository  extends JpaRepository<Discount, Long> {
}
