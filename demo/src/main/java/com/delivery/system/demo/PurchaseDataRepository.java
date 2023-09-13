package com.delivery.system.demo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PurchaseDataRepository extends JpaRepository<PurchaseData, Long> {
    PurchaseData findByRequestid(Long request_id);
}
