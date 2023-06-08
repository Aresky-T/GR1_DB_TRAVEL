package com.gr1.service_imp;

import com.gr1.dtos.request.CancelBookedTourForm;
import com.gr1.entity.Account;
import com.gr1.entity.RequestCancelBookedTour;
import com.gr1.entity.Tour;
import com.gr1.exception.CustomException;
import com.gr1.repository.BookTourRepository;
import com.gr1.repository.RequestCancelBookedTourRepository;
import com.gr1.service.IAccountService;
import com.gr1.service.IRequestService;
import com.gr1.service.ITourService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
public class RequestService implements IRequestService {

    @Autowired
    private RequestCancelBookedTourRepository requestCancelBookedTourRepository;
    @Autowired
    private BookTourRepository bookTourRepository;
    @Autowired
    private IAccountService accountService;
    @Autowired
    private ITourService tourService;

    @Override
    public RequestCancelBookedTour findById(int id){
        Optional<RequestCancelBookedTour> optional = requestCancelBookedTourRepository.findById(id);
        if(optional.isPresent()){
            return optional.get();
        } else {
            throw new CustomException("Invalid request id");
        }
    }

    @Transactional
    @Override
    public void addRequestCancelBookedTour (CancelBookedTourForm form, int accountId) {
        Account account = accountService.findById(accountId);
        Tour tour = tourService.findById(form.getTourId());
        if(Boolean.FALSE.equals(bookTourRepository.existByAccountAndTour(account, tour))){
            throw new CustomException("Không thể gửi yêu cầu hủy do chưa đặt tour");
        }
        if (Boolean.TRUE.equals(requestCancelBookedTourRepository.existsByAccountAndTour(account, tour))){
            throw new CustomException("Yêu cầu đã được gửi trước đó, vui lòng chờ email xác nhận!");
        }
        RequestCancelBookedTour request = new RequestCancelBookedTour();
        request.setTour(tour);
        request.setAccount(account);
        request.setReason(form.getReason());
        requestCancelBookedTourRepository.save(request);
    }

    @Transactional
    @Override
    public void deleteRequestCancelBookedTour (int id) {
        requestCancelBookedTourRepository.deleteById(id);
    }

    @Override
    public Account getAccountById (int id) {
        RequestCancelBookedTour request = findById(id);
        return request.getAccount();
    }

    @Override
    public Tour getTourById (int id) {
        RequestCancelBookedTour request = findById(id);
        return request.getTour();
    }
}
