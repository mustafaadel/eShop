package com.delivery.system.demo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
// commit 
@RestController
@RequestMapping(path="/api")
@CrossOrigin
public class PurchaseDataController {
    @Autowired
    private PurchaseDataService purchaseDataService;

    @GetMapping(path="/all")
    public List<PurchaseData> getAllPurchaseData() {
        return purchaseDataService.getAllPurchaseData();
    }

    @PostMapping(path="/add")
    public PurchaseData addPurchaseData(@RequestBody PurchaseData purchaseData) {
        return purchaseDataService.addPurchaseData(purchaseData);
    }

    // change status of purchaseData and send it back to the client
    @PutMapping(path="/update/{requestId}")
    public PurchaseData updatePurchaseData(@PathVariable("requestId") Long id, @RequestBody PurchaseData updatedPurchaseData) {
        return purchaseDataService.updatePurchaseDataByRequestId(id , updatedPurchaseData);
    }
    
}
