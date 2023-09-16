package com.delivery.system.demo;
import jakarta.persistence.*;

@Entity(name="purchase_data")
public class PurchaseData {
    @Id
    @SequenceGenerator(name="purchase_data_sequence", sequenceName="purchase_data_sequence", allocationSize=1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="purchase_data_sequence")
    private long id;
    private Long product_id;
    private Long owner_id;
    private String status;
    @Column(name="requestid")
    private Long requestid;
    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public Long getProduct_id() {
        return product_id;
    }
    public void setProduct_id(Long product_id) {
        this.product_id = product_id;
    }
    public Long getOwner_id() {
        return owner_id;
    }
    public void setOwner_id(Long owner_id) {
        this.owner_id = owner_id;
    }
    public void setrequestid(Long requestid) {
        this.requestid = requestid;
    }
    public Long getrequestid() {
        return requestid;
    }
    public PurchaseData() {
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public PurchaseData(long id, Long product_id, Long owner_id, String status , long requestid) {
        this.id = id;
        this.product_id = product_id;
        this.owner_id = owner_id;
        this.status = status;
        this.requestid = requestid;
    }
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + (int) (id ^ (id >>> 32));
        result = prime * result + ((product_id == null) ? 0 : product_id.hashCode());
        result = prime * result + ((owner_id == null) ? 0 : owner_id.hashCode());
        result = prime * result + ((status == null) ? 0 : status.hashCode());
        result = prime * result + (int) (requestid ^ (requestid >>> 32));
        return result;
    }
    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        PurchaseData other = (PurchaseData) obj;
        if (id != other.id)
            return false;
        if (product_id == null) {
            if (other.product_id != null)
                return false;
        } else if (!product_id.equals(other.product_id))
            return false;
        if (owner_id == null) {
            if (other.owner_id != null)
                return false;
        } else if (!owner_id.equals(other.owner_id))
            return false;
        if (status == null) {
            if (other.status != null)
                return false;
        } else if (!status.equals(other.status))
            return false;
        if (requestid != other.requestid)
            return false;
        return true;
    }
    @Override
    public String toString() {
        return "PurchaseData [id=" + id + ", product_id=" + product_id + ", owner_id=" + owner_id + ", status=" + status
                + ", requestid=" + requestid + "]";
    }




    
}
