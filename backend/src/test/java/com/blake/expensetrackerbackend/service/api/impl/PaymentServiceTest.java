package com.blake.expensetrackerbackend.service.api.impl;

import com.blake.expensetrackerbackend.service.PaymentService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

class PaymentServiceTest {

    @Test
    void testLogTransaction() {
        PaymentService paymentService = Mockito.mock(PaymentService.class);

        // 必須 mock 抽象方法，否則會報錯
//    Mockito.doNothing().when(paymentService).processPayment(Mockito.any(Order.class));

        // 測試具體方法 logTransaction
        paymentService.setTransactionId("12345");
        paymentService.logTransaction();

        // 驗證行為
        Mockito.verify(paymentService).logTransaction();
    }

}
