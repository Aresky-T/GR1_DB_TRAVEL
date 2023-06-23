package com.gr1.service_imp;

import com.gr1.dtos.request.CancelBookedTourForm;
import com.gr1.entity.Account;
import com.gr1.entity.BookedTour;
import com.gr1.entity.RequestCancelBookedTour;
import com.gr1.exception.CustomException;
import com.gr1.repository.RequestCancelBookedTourRepository;
import com.gr1.service.IAccountService;
import com.gr1.service.IRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
public class RequestService implements IRequestService {

    @Autowired
    private RequestCancelBookedTourRepository requestCancelBookedTourRepository;
    @Autowired
    private BookTourService bookTourService;
    @Autowired
    private IAccountService accountService;

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
    public void addRequestCancelBookedTour (CancelBookedTourForm form, String username) {
        BookedTour bookedTour = bookTourService.findById(form.getBookedTourId());
        Account account = accountService.findByUsername(username);

        if(!bookedTour.getAccount().equals(account)) {
            throw new CustomException("Bạn không phải người đặt tour này");
        }

        if (Boolean.TRUE.equals(requestCancelBookedTourRepository.existsByBookedTour(bookedTour))){
            throw new CustomException("Yêu cầu đã được gửi trước đó, vui lòng chờ email xác nhận!");
        }

        RequestCancelBookedTour request = new RequestCancelBookedTour();
        request.setReason(form.getReason());
        request.setBookedTour(bookedTour);
        requestCancelBookedTourRepository.save(request);
    }

    @Transactional
    @Override
    public void deleteRequestCancelBookedTour (int id) {
        requestCancelBookedTourRepository.deleteById(id);
    }
}
