package com.gr1.specification;

import com.gr1.dtos.request.PriceFilter;
import com.gr1.dtos.request.TourFilter;
import com.gr1.entity.ETourStatus;
import com.gr1.entity.Tour;
import org.springframework.data.jpa.domain.Specification;


public class TourSpecification {

    public static Specification<Tour> buildWhere (TourFilter filter){
        Specification<Tour> where = null;
        CustomSpecification status = new CustomSpecification("status", ETourStatus.NOT_STARTED);
        where = Specification.where(status);

        if(filter != null && filter.getStartAddress() != null){
            CustomSpecification startAddress = new CustomSpecification("startAddress", filter.getStartAddress());
            where = where.and(startAddress);
        }

        if(filter != null && filter.getDestination() != null){
            CustomSpecification destination = new CustomSpecification("destination", filter.getDestination());
            where = where.and(destination);
        }

        if(filter != null && filter.getVehicle() != null){
            CustomSpecification vehicle = new CustomSpecification("vehicle", filter.getVehicle());
            where = where.and(vehicle);
        }

        if(filter != null && filter.getMinPrice() != null){
            PriceFilter priceFilter = new PriceFilter(filter.getMinPrice(), filter.getMaxPrice());
            CustomSpecification price = new CustomSpecification("price1", priceFilter);
            where = where.and(price);
        }

        return where;
    }
}
