package com.wfs.bia.service;

import com.wfs.bia.model.User;
import org.springframework.stereotype.Service;

/**
 * Created by wajahat on 27/02/2016.
 */
@Service
public interface UserService {

    public User createUser(String firstName, String lastName, String userStatus, String userRole);

    public void deleteUser(String userId);

    public User findByUserId(String userId);

}
