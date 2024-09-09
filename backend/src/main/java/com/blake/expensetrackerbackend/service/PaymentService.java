package com.blake.expensetrackerbackend.service;

public abstract class PaymentService {
    protected String transactionId;

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public abstract void processPayment(Object order);

    public void logTransaction() {
        System.out.println("Logging transaction: " + transactionId);
    }
}
