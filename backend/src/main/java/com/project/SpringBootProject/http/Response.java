package com.project.SpringBootProject.http;

import com.project.SpringBootProject.bean.User;

public class Response {

    private boolean success;
    private int code;
    private String message;
    private User user;

    public Response() {
        super();
    }

    public Response(boolean success) {
        super();
        this.success = success;
        this.code = success ? 200 : 400;
        this.message = "";
    }

    public Response(boolean success, String message) {
        super();
        this.success = success;
        this.code = success ? 200 : 400;
        this.message = message;
    }

    public Response(boolean success, int code, String message) {
        super();
        this.success = success;
        this.code = code;
        this.message = message;
    }

    public Response(boolean success, int code, String message, User user) {
        super();
        this.success = success;
        this.code = code;
        this.message = message;
        this.user=user;
    }

    public Response(boolean success, User user) {
        super();
        this.success = success;
        this.user = user;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }


    @Override
    public String toString() {
        return "Response{" +
                "success=" + success +
                ", code=" + code +
                ", message='" + message + '\'' +
                ", user=" + user +
                '}';
    }
}