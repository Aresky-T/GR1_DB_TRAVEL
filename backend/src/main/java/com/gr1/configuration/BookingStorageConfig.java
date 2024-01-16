package com.gr1.configuration;

import com.gr1.dtos.request.BookTourRequest;
import com.gr1.entity.Account;
import com.gr1.entity.Tour;
import com.gr1.exception.CustomException;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.Instant;
import java.util.*;

@Getter
@Component
@Scope("singleton")
public class BookingStorageConfig {

    public static final long expiration = 15 * 60 * 1000;

    private final Set<Element> elements = new HashSet<>();

    public Element checkElementAndCreateOrUpdate(Account account, Tour tour){
        if(Boolean.TRUE.equals(isExistElement(account, tour))){
            Element element = getElement(account, tour);
            if(isExpiredElement(element)){
                element.expiration = Instant.now().plusMillis(BookingStorageConfig.expiration);
            } else {
                Duration duration = Duration.between(Instant.now(), element.expiration);
                long interval = duration.getSeconds();

                StringBuilder stringBuilder = new StringBuilder("Không thể tạo phiên thanh toán liên tục, hãy thử lại sau ");
                if(interval < 60){
                    stringBuilder.append(interval).append(" giây!");
                } else {
                    stringBuilder.append(interval / 60).append(" phút!");
                }
                throw new CustomException(stringBuilder.toString());
            }
        } else {
            addNewElement(account, tour);
        }

        return getElement(account, tour);
    }

    public Element getElement(Account account, Tour tour){
        return elements.stream()
                .filter(s -> Objects.equals(s.account.getId(), account.getId()) && Objects.equals(s.tour.getId(), tour.getId()))
                .findFirst().orElse(null);
    }

    public Element getElement(String title){
        return elements.stream()
                .filter(s -> s.title.equals(title))
                .findFirst().orElse(null);
    }

    public boolean isExistElement(Account account, Tour tour){
        return elements.stream().anyMatch(session ->
                Objects.equals(session.account.getId(), account.getId())
                        && Objects.equals(session.tour.getId(), tour.getId())
        );
    }

    public boolean isExistElement(Element element){
        return elements.stream().anyMatch(element::equals);
    }

    public boolean isExpiredElement (Element element){
        return Instant.now().isAfter(element.expiration);
    }

    public void addNewElement (Account account, Tour tour){
        if(Boolean.FALSE.equals(isExistElement(account, tour))) {
            elements.add(new Element(account, tour));
        }
    }

    public void removeElement (Element element){
        if(Boolean.TRUE.equals(isExistElement(element))){
            elements.removeIf(element::equals);
        }
    }

    @Getter
    @NoArgsConstructor
    public static class Element {
        @Setter
        private String title;

        private Account account;
        private Tour tour;
        private Instant expiration;

        @Setter
        private BookTourRequest bookingInfo;

        public Element(Account account, Tour tour) {
            this.account = account;
            this.tour = tour;
            this.title = "SESSION_ACCOUNT_" + account.getId() + "_TOUR_" + tour.getId();
            this.expiration = Instant.now().plusMillis(BookingStorageConfig.expiration);
        }

        @Override
        public boolean equals(Object obj) {
            if(this == obj){
                return true;
            }

            if(obj instanceof Element){
                Element element = (Element) obj;
                boolean isSameAccount = Objects.equals(this.account.getId(), element.account.getId());
                boolean isSameTour = Objects.equals(this.tour.getId(), element.tour.getId());
                return isSameAccount && isSameTour;
            }

            return false;
        }

        @Override
        public String toString(){
            return "Session: [title = " + title + ", account = "  + account.getId() + ", tour = " + tour.getId() + " ]";
        }
    }
}
