package com.PTIT.BookStore.exception;

public class DuplicateBookInCartException extends Exception{
    public DuplicateBookInCartException() {
        super();
    }

    public DuplicateBookInCartException(String message) {
        super(message);
    }

    public DuplicateBookInCartException(String message, Throwable cause) {
        super(message, cause);
    }

    public DuplicateBookInCartException(Throwable cause) {
        super(cause);
    }

    protected DuplicateBookInCartException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
