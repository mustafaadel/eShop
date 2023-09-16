package com.delivery.system.demo;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Service
public class PurchaseDataService {
    @Autowired
    private PurchaseDataRepository purchaseDataRepository;

    public List<PurchaseData> getAllPurchaseData() {
        return purchaseDataRepository.findAll();
    }

    public PurchaseData getPurchaseDataById(Long id) {
        return purchaseDataRepository.findById(id).orElse(null);
    }

    public PurchaseData addPurchaseData(PurchaseData purchaseData) {
        return purchaseDataRepository.save(purchaseData);
    }

    public String deletePurchaseData(Long id) {
        purchaseDataRepository.deleteById(id);
        return "PurchaseData removed: " + id;
    }
    
    public PurchaseData updatePurchaseDataByRequestId(Long reqId , PurchaseData updatedPurchaseData){
        PurchaseData purchaseData = purchaseDataRepository.findByRequestid(reqId);
        if (purchaseData == null) {
            return null;
        }
        purchaseData.setStatus(updatedPurchaseData.getStatus());
        return purchaseDataRepository.save(purchaseData);
    }

}
