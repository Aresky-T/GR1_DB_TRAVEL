package com.gr1.specification;

import com.gr1.entity.Tour;
import lombok.NonNull;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

public class CustomSpecification implements Specification<Tour> {

    @NonNull
    private String field;
    @NonNull
    private Object value;

    @Override
    public Predicate toPredicate (Root<Tour> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        if(field.equalsIgnoreCase("startAddress")){
            return criteriaBuilder.like(root.get("startAddress"), "%" + value.toString() + "%");
        }

        if (field.equalsIgnoreCase("destination")){
            return criteriaBuilder.like(root.get("destinationList"), "%" + value.toString() + "%");
        }

        if(field.equalsIgnoreCase("vehicle")){
            return criteriaBuilder.like(root.get("vehicle"), "%" + value.toString() + "%");
        }
        return null;
    }

    public CustomSpecification(String field, Object value){
        this.field = field;
        this.value = value;
    }
}
