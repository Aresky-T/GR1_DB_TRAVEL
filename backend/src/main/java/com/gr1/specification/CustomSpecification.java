package com.gr1.specification;

import com.gr1.dtos.request.PriceFilter;
import com.gr1.dtos.request.TourFilter;
import com.gr1.entity.ETourStatus;
import com.gr1.entity.Tour;
import lombok.NonNull;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

public class CustomSpecification implements Specification<Tour> {

    @NonNull
    private final String field;
    @NonNull
    private final Object value;

    @Override
    public Predicate toPredicate (Root<Tour> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {

        if (field.equalsIgnoreCase("status")){
            ETourStatus status = (ETourStatus) value;
            return criteriaBuilder.equal(root.get("status"), status);
        }

        if(field.equalsIgnoreCase("startAddress")){
            return criteriaBuilder.like(root.get("startAddress"), "%" + value.toString() + "%");
        }

        if (field.equalsIgnoreCase("destination")){
            return criteriaBuilder.like(root.get("destinationList"), "%" + value.toString() + "%");
        }

        if(field.equalsIgnoreCase("vehicle")){
            return criteriaBuilder.like(root.get("vehicle"), "%" + value.toString() + "%");
        }

        if(field.equalsIgnoreCase("price1")){
            PriceFilter priceFilter = (PriceFilter) value;
            if(priceFilter.getMaxPrice() == null){
                return criteriaBuilder.greaterThanOrEqualTo(root.get("price1"), priceFilter.getMinPrice());
            }
            return criteriaBuilder.between(root.get("price1"), priceFilter.getMinPrice(), priceFilter.getMaxPrice());
        }

        return null;
    }

    public CustomSpecification(String field, Object value){
        this.field = field;
        this.value = value;
    }
}
