package com.PTIT.BookStore.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse {

    private int id;
    private String token;

    private String type = "Bearer";
    private String firstName;
    private String lastName;
    private String email;

    private List<String> roles;

    public LoginResponse(int id, String token, String email, String firstName, String lastName, List<String> roles) {
        this.id = id;
        this.token = token;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.roles = roles;
    }
}
