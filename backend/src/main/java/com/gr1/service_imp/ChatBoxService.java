package com.gr1.service_imp;

import com.gr1.compare.ChatComparator;
import com.gr1.dtos.response.ChatResponse;
import com.gr1.dtos.response.CustomerDTO;
import com.gr1.dtos.response.RoomChatForCustomer;
import com.gr1.dtos.response.RoomChatForEmployee;
import com.gr1.entity.*;
import com.gr1.repository.ChatBoxRepository;
import com.gr1.repository.ChatRepository;
import com.gr1.service.IChatBoxService;
import com.gr1.service.ICustomerService;
import com.gr1.service.IEmployeeService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@Service
public class ChatBoxService implements IChatBoxService {

    @Autowired
    private ChatBoxRepository chatBoxRepository;
    @Autowired
    private ChatRepository chatRepository;
    @Autowired
    private IEmployeeService employeeService;
    @Autowired
    private ICustomerService customerService;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<ChatBox> findAllByEmployee (Employee employee) {
        return chatBoxRepository.findAllByEmployeeIs(employee)
                .stream()
                .map(this::setLatestChat)
                .collect(Collectors.toList());
    }

    @Transactional
    @Override
    public ChatBox connect (String fullName, String email) {
        if(employeeService.existsOnlineEmployee()){
            Employee employee = employeeService.findByStatus(EEmployeeStatus.ONLINE);
            if(customerService.isExistsByEmail(email)){
                Customer customer = customerService.findByEmail(email);
                if(!Objects.equals(customer.getFullName(), fullName)){
                    customer.setFullName(fullName);
                    customerService.save(customer);
                }
                return connect(customerService.findByEmail(email), employee);
            } else {
                return connect(customerService.save(new Customer(fullName, email, ECustomerStatus.ONLINE)), employee);
            }
        }
        return null;
    }

    @Transactional
    @Override
    public ChatBox connect (Account account) {
        if(employeeService.existsOnlineEmployee()){
            Employee employee = employeeService.findByStatus(EEmployeeStatus.ONLINE);
            if(customerService.isExistsByAccount(account)){
                return connect(customerService.findByAccount(account), employee);
            } else {
                return connect(customerService.save(new Customer(account, ECustomerStatus.ONLINE)), employee);
            }
        }
        return null;
    }

    private ChatBox connect (Customer customer, Employee employee){
        if(customer.getStatus().equals(ECustomerStatus.OFFLINE)) {
            customer.setStatus(ECustomerStatus.ONLINE);
            customerService.save(customer);
        }
        return chatBoxRepository.findByCustomerIsAndEmployeeIs(customer, employee)
                .orElseGet(() -> chatBoxRepository.save(new ChatBox(customer, employee)));
    }

    @Override
    public ChatBox findById (int chatBoxId) {
        Optional<ChatBox> optional = chatBoxRepository.findById(chatBoxId);
        return optional.map(this::setLatestChat).orElse(null);
//        return chatBoxRepository.findById(chatBoxId).orElse(null);
    }

    @Override
    public ChatBox findByCustomerAndEmployee (Customer customer, Employee employee) {
        return chatBoxRepository.findByCustomerIsAndEmployeeIs(customer, employee).orElse(null);
    }

    @Transactional
    @Override
    public boolean deleteById (int chatBoxId) {
        AtomicBoolean isDeleted = new AtomicBoolean(false);
        chatBoxRepository.findById(chatBoxId).ifPresent(chatBox -> {
            chatBoxRepository.delete(chatBox);
            isDeleted.set(true);
        });
        return isDeleted.get();
    }

    @Override
	public RoomChatForEmployee convertToRoomChatForEmployeeDto (ChatBox chatBox) {
		RoomChatForEmployee dto = new RoomChatForEmployee();
        dto.setId(chatBox.getId());
        dto.setCustomer(new CustomerDTO(chatBox.getCustomer()));
        dto.setCreatedAt(chatBox.getCreatedAt().toString());
        // get chat list
        List<Chat> chats = chatBox.getChatList();
        if(chats.isEmpty()){
            dto.setChatList(new ArrayList<>());
            dto.setNewMessagesCount(0);
            dto.setLatestChat(null);
        } else {
            chats.sort(new ChatComparator());
            dto.setChatList(modelMapper.map(chats, new TypeToken<List<ChatResponse>>(){}.getType()));
            // Chat latestChat = chatBox.getLatestChat();
            Chat latestChat = chats.get(chats.size() - 1);
            dto.setNewMessagesCount(getNewMessagesCount(chats));
            dto.setLatestChat(modelMapper.map(latestChat, ChatResponse.class));
        }
        return dto;
	}

	@Override
	public RoomChatForCustomer convertToRoomChatForCustomerDto (ChatBox chatBox) {
		RoomChatForCustomer dto = new RoomChatForCustomer();
        dto.setId(chatBox.getId());
        List<Chat> chats = chatRepository.findAllByChatBoxOrderBySentAtAsc(chatBox);
        if(chats.isEmpty()){
            dto.setChatList(new ArrayList<>());
        } else {
            chats.sort(new ChatComparator());
            dto.setChatList(modelMapper.map(chats, new TypeToken<List<ChatResponse>>(){}.getType()));
        }
        dto.setCustomer(new CustomerDTO(chatBox.getCustomer()));
        dto.setEmployee(new RoomChatForCustomer.EmployeeDTO(chatBox.getEmployee()));
        return dto;
	}

    public ChatBox setLatestChat(ChatBox chatBox){
        chatBox.setLatestChat(chatRepository.findLatestChatByChatBox(chatBox.getId()).orElse(null));
        return chatBox;
    }

    public int getNewMessagesCount(List<Chat> chats){
        AtomicInteger count = new AtomicInteger(0);
        chats.forEach(chat -> {
            if(chat.getSender().equals(ESender.CUSTOMER) && chat.getStatus().equals(EMessageStatus.NEW)){
                count.getAndIncrement();
            }
        });
        return count.get();
    }
}
