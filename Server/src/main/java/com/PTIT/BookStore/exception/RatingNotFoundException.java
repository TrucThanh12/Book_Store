package com.PTIT.BookStore.exception;

public class RatingNotFoundException extends Exception{
    public RatingNotFoundException() {
        super();
    }

    public RatingNotFoundException(String message) {
        super(message);
    }

    public RatingNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public RatingNotFoundException(Throwable cause) {
        super(cause);
    }

    protected RatingNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
